import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  const [emailData, setEmailData] = useState('');

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
      setEmailData('');
    }
  }, [state, data]);

  const onChangeEmail = e => {
    setEmailData(e.target.value);
  }

  return (
    <fetcher.Form 
      method="post" 
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        value={emailData}
        onChange={onChangeEmail}
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
