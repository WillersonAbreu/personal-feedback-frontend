// React imports
import React, { useState, useEffect } from 'react';

// Router DOM imports
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Components imports
import PrivateRoute from './PrivateRoute';
import Home from '~/pages/Home/Home';

// Custom layout import
import CustomLayout from '~/components/CustomLayout/CustomLayout';

// Helpers
import { checkAuth } from '~/helpers/AuthHelper';

// Exporting route service
export default function Routes() {
  const token = useSelector((state) => state.auth.token);

  const [isSigned, setIsSigned] = useState(null);

  useEffect(() => {
    const authenticated = checkAuth();
    setIsSigned(authenticated);
  }, [token]);

  return (
    <Router>
      <Switch>
        <CustomLayout>
          <Route exact path="/" component={Home} />
          <PrivateRoute
            isSigned={isSigned}
            path="/main"
            component={() => <h1>Main</h1>}
          />
        </CustomLayout>
      </Switch>
    </Router>
  );
}
