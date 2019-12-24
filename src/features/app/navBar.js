import React, { useEffect, useState } from "react";
import { withMedia } from "react-media-query-hoc";

import Logo from "../../assets/icons/logo/logo.png";
import * as RoutePath from "../../config/routeConfig";
import { fsc } from "../../assets/fontControlHelper";
import MyLink from "../../tools/myLink";
import * as Colors from "../../config/colorConfig";

import Sidebar from "react-sidebar";
import FilerMenu from '../../assets/images/filter menu.png'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const Navbar = props => {
  const { media, handleOnChange, foodData, MenuLists, handleCheck, val, val1 } = props;
  const [MenuClick, setMenuClick] = useState(false)
  const [isIcon, setisIcon] = useState(false)
  const [open, setOpen] = useState(false)
  const [topHide, setTopHide] = useState(true)
  const handleMenuClick = () => {
    setMenuClick(!MenuClick);
  };
  useEffect(() => {
    if (media.desktop || media.tablet) {
      setMenuClick(false);
    }
    if (media.desktop || media.tablet) {
      setOpen(false)
    }
  });
  const IconClick = () => {
    setisIcon(true)

  }
  const onSetSidebarOpen = open => {
    setOpen(open)
    setTopHide(false)
  }
  const Options = foodData.map((v, k) => {
    return { value: v.food_id, label: v.food_name, isFixed: true }
  })
  const StylingSidebar = {
    sidebar: {
      zIndex: 100000,
      backgroundColor: "rgb(128,0,0)",
      width: '70%',
      position: "fixed",
      height:'100%'

    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0)',
      position: "fixed"
    }

  };
  return (
    <div>
      <Sidebar
        sidebar={
          <div>
            <div className="sticky-top">
              <div
                id="NavbarContainer"
                className={media.mobile ? "d-flex flex-row w-100 justify-content-between" : "d-flex flex-row w-100 justify-content-between py-2 px-5"}
               
              >
                {/* <div className="d-flex flex-row">
                  <div style={{ width: 80 }} className="p-2">
                    <img src={Logo} alt="Logo" className="w-100" style={{ "filter": "brightness(100%)" }} />
                  </div>
                  <div className="p-2 my-3" style={{ background: 'rgb(128,0,0)' }}>
                    <h4 style={{ color: "white" }}>IMPERIAL</h4>
                  </div>
                </div> */}

                <div style={{ width: '400px' }} className="my-3 mr-3">
                  <div className="form-group has-search ml-3">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input type="text" className="form-control" value={val1} placeholder="Search by food name,size,price" onChange={(e) => handleOnChange(e.target.value)} />
                  </div>
                </div>

                <span className="mr-5" style={{ cursor: 'pointer', color: 'white' }} onClick={() => onSetSidebarOpen(false)} ><i className="fas fa-times my-4" style={{ fontSize: '20px' }}></i></span>


              </div>

            </div>
            <div className="container-fluid">
              <div className="row">
                {MenuLists.map((value, k) => {
                  return <div className="col-xs-6 col-sm-6" key={k}>

                    <FormGroup row className="mx-2">
                      <FormControlLabel style={{ color: Colors.textWhite, fontWeight: 'bold', fontSize: fsc(media, 14) }}
                        control={
                          <Checkbox checked={val.includes(value.menu_id)}
                            onChange={(e) => handleCheck(value.menu_id)}
                            value={value.menu_id}
                            style={{ width: '14px', height: '14px', color: "#fff", marginRight: "10px" }}
                          />
                        }
                        label={value.menu_name}
                      />
                    </FormGroup>
                  </div>

                })}

              </div>
            </div>
          </div>
        }
        open={open}
        transitions={true}
        pullRight={true}
        style={StylingSidebar}
        onSetOpen={() => onSetSidebarOpen()}
        styles={StylingSidebar}
      >

      </Sidebar>
      <div className={topHide ? "sticky-top position-fixed w-100" : "sticky-top"}>

        <div
          id="NavbarContainer"
          className={media.mobile ? "d-flex flex-row w-100 justify-content-between" : "d-flex flex-row w-100 justify-content-between py-2 px-5"}
          style={{
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.4)"

          }}
        >

          <div className="d-flex flex-row">
            <div style={{ width: 80 }} className="p-2">
              <img src={Logo} alt="Logo" className="w-100" style={{ "filter": "brightness(100%)" }} />
            </div>
            <div className="p-1 my-3" style={{ background: 'rgb(128,0,0)' }}>
              <h4 style={{ color: "white" }} className="mt-2">IMPERIAL</h4>
            </div>
          </div>
          {media.mobile ? <span className="mr-5" style={{ cursor: 'pointer', color: 'white' }} onClick={() => onSetSidebarOpen(true)} ><i className="fas fa-bars my-4" style={{ fontSize: '20px' }}></i></span>
            :
            <div style={{ width: '400px' }} className="my-3">
              <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input type="text" className="form-control" value={val1} placeholder="Search by food name,size,price" onChange={(e) => handleOnChange(e.target.value)} />
              </div>
            </div>

          }
        </div>

      </div>
    </div>
  );
};

export default withMedia(Navbar);