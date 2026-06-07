/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { AppLayout } from './components/Layout';

// Will create these next
import { Splash } from './pages/Splash';
import { Onboarding } from './pages/Onboarding';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { ServicesList } from './pages/ServicesList';
import { ServiceDetails } from './pages/ServiceDetails';
import { SpecialistSelect } from './pages/SpecialistSelect';
import { BookCalendar } from './pages/BookCalendar';
import { Summary } from './pages/Summary';
import { Payment } from './pages/Payment';
import { Confirmation } from './pages/Confirmation';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Notifications } from './pages/Notifications';
import { EditProfile } from './pages/EditProfile';
import { PaymentMethods } from './pages/PaymentMethods';
import { Settings } from './pages/Settings';
import { HelpCenter } from './pages/HelpCenter';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-slate-100 flex items-center justify-center md:p-4">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/book/:serviceId/specialist" element={<SpecialistSelect />} />
            <Route path="/book/:serviceId/:specialistId/calendar" element={<BookCalendar />} />
            <Route path="/book/:serviceId/:specialistId/:date/summary" element={<Summary />} />
            <Route path="/book/payment" element={<Payment />} />
            <Route path="/book/confirmation" element={<Confirmation />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/payments" element={<PaymentMethods />} />
            <Route path="/profile/settings" element={<Settings />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}
