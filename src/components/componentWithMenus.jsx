import React from 'react';
import NavigationBar from './NavigationBar/navigationBar';
import VerticalMenu from './VerticalMenu/verticalMenu';

// a component that is rendered along with the navigation bar and the vertical menu
const ComponentWithMenus = ({component}) => {
    return(
        <div>
            <NavigationBar/>
            <div className='flex'>
                <VerticalMenu/>
                {component}
            </div>
        </div>
    )
}

export default ComponentWithMenus;