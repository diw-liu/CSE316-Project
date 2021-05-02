import React, { useState }            from 'react';
import { WCard, WInput, WLHeader, WButton, WLMain, WRow, WCol, WLayout } from 'wt-frontend';
import WLFooter from 'wt-frontend/build/components/wlayout/WLFooter';
import WLSide from 'wt-frontend/build/components/wlayout/WLSide';
import HomeContent      from './HomeContent'
const HomePage = (props) =>{
    const name = '';
    const [addingNewMap, toggleNewMap] = useState(false);
   
    const handleCreateMap = async (e) =>{
        const name = e.target.value;
        props.addMapList(name, 'Home');
        toggleNewMap(!addingNewMap)
    }

    return(
        <WCard style={{ width: "900px", height: "800px" }}>
            <WLayout wLayout="header-rside" className="example-layout-labels">
                
                <WLHeader className='logo' style={{ backgroundColor: "#2b2e36" }}>
                    <div className="center">
                        Your Maps
                    </div>
                </WLHeader>

                <WLMain style={{ backgroundColor: "#353a44"}} className="table-entries">
                    <HomeContent maplists={props.maplists} removeMapList={props.removeMapList}
                      updateMapList={props.updateMapList} setActiveList={props.setActiveList}
                    />
                </WLMain> 
                
                <WLSide>
                    <WLayout wLayout="footer" className="example-layout-labels">
                        
                        <WLFooter style={{backgroundColor: "#f13564"}}>
                        {
                            addingNewMap || (addingNewMap && name=='')
                            ?<WInput
                                className="table-input" 
                                onBlur={handleCreateMap} autoFocus={true} 
                                defaultValue={"Enter Map Name here"} type='text'
                                inputClass="table-input-class"
                            />
                            :<WButton className='home-button' style={{width:"100%",height:"100%",display:"block",backgroundColor: "#f13564"}} 
                                onClick={()=>toggleNewMap(!addingNewMap)}>Create New Map</WButton>
                        }
                        </WLFooter>
                    </WLayout>
                </WLSide>

            </WLayout> 
        </WCard>
    )
}
export default HomePage;