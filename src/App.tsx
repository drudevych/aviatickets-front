import './App.css';
import Navigation from './shared/Navigation';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
       <Navigation />
    </LocalizationProvider>   
  );
}

export default App;
