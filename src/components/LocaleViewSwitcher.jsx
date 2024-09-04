import { ViewSwitcher as DefaultViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import './LocaleViewSwitcher.css';

const localeViewNames = {
  'en-US': {
    day: 'Day',
    week: 'Week',
    month: 'Month',
  },
  'pl-PL': {
    day: 'Dzień',
    week: 'Tydzień',
    month: 'Miesiąc',
  },
};

const LocaleViewSwitcher = ({ locale }) => {
  const currentViewNames = localeViewNames[locale] || localeViewNames['en-US'];

  return (
    <DefaultViewSwitcher
      switcherComponent={({ currentView, availableViews, onChange }) => (
        <div>
          {availableViews.map((view) => (
            <button
              className='view-mode-button'
              key={view.name}
              type='button'
              onClick={() => onChange(view.name)}
              style={{
                fontWeight: currentView.name === view.name ? 'bold' : 'normal',
                backgroundColor:
                  currentView.name === view.name
                    ? 'rgb(25, 118, 210)'
                    : 'rgb(100, 181, 246)',
              }}
            >
              {currentViewNames[view.name.toLowerCase()]}
            </button>
          ))}
        </div>
      )}
    />
  );
};

export default LocaleViewSwitcher;
