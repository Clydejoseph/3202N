import React from 'react'
import { useState } from 'react'

import TechNav from './navBars/Nav-LabTech';
import HeadNav from './navBars/Nav-LabHead';
import AdminNav from './navBars/Nav-Admin';



function NavComponent(component) {


    if(component === 'Tech'){
        return <TechNav />;
    }
    else if(component === 'Head'){
       return <HeadNav />;
    }
    else if(component === 'Admin'){
        return <AdminNav />
    }
}

function Navigationbar(props) {
  return NavComponent(props.component);
}

export default Navigationbar