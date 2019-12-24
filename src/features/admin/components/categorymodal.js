import React from 'react'
import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact";
import * as Colors from "../../../config/colorConfig";
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const CategoryModal = props => {
    const { idname, title, red, MenuItems, Handle_Add_Menu_Items, HandleAddMenuItems, clearMenuItem,
        text, menuIndex,menuStatus,CheckOnChange
    } = props
        
    return (
        <div className="modal fade" id={idname}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={(e) => Handle_Add_Menu_Items(e, menuIndex)}>
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={clearMenuItem}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <MDBInput label="Add category"
                                        style={red ?
                                            { outline: '0!important', borderBottom: '1px solid #ff3547', boxShadow: 'none' } : null}
                                        onChange={(e) => HandleAddMenuItems(e.target.value)} value={MenuItems} validate required />
                                    <FormGroup row className="mx-2">
                                        <FormControlLabel style={{ color: 'black', fontWeight: 'bold'}}
                                            control={
                                                <Checkbox checked={menuStatus}
                                                   onChange = {(e)=>CheckOnChange(e)}
                                                   value={menuStatus}
                                                />
                                            }
                                            label={"Active"}
                                        />
                                    </FormGroup>
                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <MDBBtn type="submit"> <span><i className="fa fa-plus"></i></span>{text}</MDBBtn>
                            <MDBBtn data-dismiss="modal" onClick={clearMenuItem}>Cancel</MDBBtn>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
export default CategoryModal