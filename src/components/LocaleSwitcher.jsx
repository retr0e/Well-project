import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const PREFIX = 'locale-switch';

const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
};

const StyledDiv = styled('div')({
  [`&.${classes.container}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    justifyContent: 'flex-end',
    fontFamily: '"Open Sans", sans-serif',
    color: 'rgb(25, 118, 210)',
  },
  [`& .${classes.text}`]: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '20px',
    marginRight: '16px',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInput-underline:before': {
    borderBottom: 'none',
  },
  '& .MuiInput-underline:after': {
    borderBottom: 'none',
  },
  '& .MuiInput-root': {
    paddingBottom: 0,
  },
  '& .MuiInputBase-input': {
    paddingBottom: 0,
  },
  '& .MuiSvgIcon-root': {
    paddingTop: 2,
  },
});

const LocaleSwitcher = ({ onLocaleChange, currentLocale }) => (
  <StyledDiv className={classes.container}>
    <span className={classes.text}>App Language:</span>
    <StyledTextField
      select
      variant='standard'
      value={currentLocale}
      onChange={(event) => {
        onLocaleChange(event.target.value);
      }}
    >
      <MenuItem value='en-US'>English (United States)</MenuItem>
      <MenuItem value='pl-PL'>Polish (Poland)</MenuItem>
    </StyledTextField>
  </StyledDiv>
);

export default LocaleSwitcher;
