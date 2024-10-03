import React, { FC, ReactNode } from 'react';

import PageHeader from '../elements/PageHeader/PageHeader.tsx'
import PageFooter from '../elements/PageFooter/PageFooter.tsx'

interface AppProps { 
   children: ReactNode;
}

const App: FC<AppProps> = ({ children }) => {
   return (
      <>
         <PageHeader />
         <main>{children}</main>
         <PageFooter />
      </>
   );
};
export default App;