import { useState, useEffect } from 'react';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import Paper from '@mui/material/Paper';
import LocaleViewSwitcher from './LocaleViewSwitcher.jsx';
import LocaleSwitcher from './LocaleSwitcher.jsx';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  ConfirmationDialog,
  DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './../firebase.js';

const CURRENT_DATE = new Date().toJSON().slice(0, 10);

const Calendar = () => {
  const [today, setToday] = useState(CURRENT_DATE);
  const [locale, setLocale] = useState('en-US');
  const [appointments, setAppointments] = useState();
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState();

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'appointments'));
    const newData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        startDate:
          data.startDate instanceof Timestamp ? data.startDate.toDate() : data.startDate,
        endDate: data.endDate instanceof Timestamp ? data.endDate.toDate() : data.endDate,
      };
    });
    setAppointments(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAppointmentHandler = async (creationData) => {
    try {
      if (!creationData.title || !creationData.title.trim()) {
        console.error(
          'Cannot create appointment without title. Please insert a valid not empty value'
        );
        return;
      }
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...creationData,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error during document addition: ', error);
    }
  };

  const changeAppointment = async (id, updatedFields) => {
    try {
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, updatedFields);
    } catch (error) {
      console.error('Error during document update:', error);
    }
  };

  const deleteAppointment = async (element) => {
    try {
      const docRef = doc(db, 'appointments', element);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error during document deletion', error);
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      addAppointmentHandler(added);
    }
    if (changed) {
      Object.keys(changed).forEach((id) => {
        const updatedFields = changed[id];
        changeAppointment(id, updatedFields);
      });
    }
    if (deleted !== undefined) {
      deleteAppointment(deleted);
    }
    fetchData();
  };

  return (
    <>
      <Paper>
        <Scheduler data={appointments} locale={locale} height={600}>
          <ViewState currentDate={today} onCurrentDateChange={setToday} />
          <DayView />
          <WeekView startDayHour={0} endDayHour={24} />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={setAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={setAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={setEditingAppointment}
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <LocaleViewSwitcher locale={locale} />
          <Appointments />
          <EditRecurrenceMenu />
          <ConfirmationDialog />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
      <LocaleSwitcher currentLocale={locale} onLocaleChange={setLocale} />
    </>
  );
};

export default Calendar;
