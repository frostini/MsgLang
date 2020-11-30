import React from "react";
export const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey)
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
 
  return [value, setValue];
};

export const userData = {
  name: 'Marlon',
  email: 'marlonjfrausto@gmail.com',
  phone: '+16193736451'
}

export const twilioData = {
  token: 'lskfjlwrkj348u934iufihwf',
  sid: 'kjhkjehnkjhekfjeh',
  phone: '+14158739797'
}