import './sass/index.scss';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from './components/Modals/modal';
import PostsList from './components/Posts/postsList';
import ComponentWithMenus from './components/componentWithMenus';
import { useSelector } from 'react-redux';

const App = () => {
  const modalStore = useSelector(state => state?.modal);

  return (
    <div>
      <ComponentWithMenus component={<PostsList/>} />

      {/* a global modal that gets a modal component as prop */}
      <Modal
        show={modalStore?.modalShow}
        component={modalStore?.modalComponent}
      />

    </div>
  );
}

export default App;