import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui.jsx';
import { usePageTitle } from '../hooks.js';

export default function NotFound() {
  usePageTitle('Page not found');
  return (
    <>
      <PageHeader title="Page not found">That address does not lead anywhere on Landfall.</PageHeader>
      <div className="wrap flex flex-wrap gap-3 py-12"><Link to="/destinations" className="btn btn-primary">Explore destinations</Link><Link to="/" className="btn border-primary bg-transparent">Back to the home page</Link></div>
    </>
  );
}
