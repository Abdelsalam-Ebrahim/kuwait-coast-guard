import { Link, useRouteError } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const err = useRouteError?.() || {}
  return (
    <div style={{ padding: 24 }}>
      <Navbar />

  <h1>الصفحة غير موجودة</h1>

      {err?.statusText || err?.message ? (
        <p style={{ color: '#888' }}>{err.statusText || err.message}</p>
      ) : null}

  <p><Link to="/">العودة إلى الرئيسية</Link></p>

      <Footer />
    </div>
  )
}

export default NotFound;
