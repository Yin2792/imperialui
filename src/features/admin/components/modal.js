import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBInput, MDBDataTable, MDBContainer } from "mdbreact";
import { readCookie } from '../../../helper/cookieUser'
import { FetchUserControllerGetMenu, FetchAdminControllerAddFood, FetchAdminControllerAddMenu } from '../../../network/api.Fetched'
import { ImageAPI } from '../../../network/imperial.api'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
export const Modal = props => {
    const { HandleFoodName, HandleImage, HandleMenuId, HandlePrice, HandleSize,
        HandleProductAdd, menuData, foodName, menuId, price, size,
        title, idname, index, text, image, file, clearState, fileInput, red,imageName,menuStatus,CheckOnChange
    } = props
    
    return (
        <div className="modal fade" id={idname}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={(e) => HandleProductAdd(e, index)}>
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" onClick={()=>clearState()}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <MDBInput label="Food Name" style={red ?
                                        { outline: '0!important', borderBottom: '1px solid #ff3547', boxShadow: 'none' } : null} name="foodName" id="foodName" onChange={(e) => HandleFoodName(e.target.value, index)} value={foodName} validate required />
                                </div>
                                <div className="col">
                                    <MDBInput label="Food Price" name="price" type="number" onChange={(e) => HandlePrice(e.target.value, e, index)} value={price} validate required />
                                </div>
                                <div className="col">
                                    <MDBInput label="Food size" name="size" onChange={(e) => HandleSize(e.target.value, index)} value={size} validate required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>Select Category</label>
                                    <select class="custom-select custom-select-sm" required onChange={(e) => HandleMenuId(e.target.value, index)} value={menuId}>
                                        {menuData}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div class="form-group col my-3">
                                    <img alt="image" id="filename" style={{ width: '100px', height: "100px" }} src={file == null ? `${ImageAPI}/${image}` : file}></img>
                                </div>
                            </div>
                            <div className="row mx-1">
                                <div class="form-group col-sm-4 col-image my-3" style={{ background: 'linear-gradient(to left, #02AAB0 0%, #00CDAC 100%)', maxWidth: '30%', borderRadius: '1px' }}>
                                    <label for="upload-photo" id="upload" className="my-1 mx-1">choose photo</label>
                                    <input type="file"  name="photo" className="form-control" name="foodImage" id="upload-photo"  accept="image/*" onChange={(e) => HandleImage(e.target.files[0],e)}></input>

                                </div>
                                <div className="col-sm-8 my-4">
                                     {index !=undefined?<strong>{file == null?image:imageName}</strong>:
                                    <strong>{imageName==null?"default.png":imageName}</strong>}
                                </div>
                            </div>
                            <div className="row">
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

                        <div className="modal-footer">
                            <MDBBtn type="submit"> <span><i className="fa fa-plus"></i></span> {text}</MDBBtn>
                            <MDBBtn data-dismiss="modal" onClick={()=>clearState()}>Cancel</MDBBtn>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}