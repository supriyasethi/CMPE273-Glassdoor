/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Navbar.css';
import {
  updateSearcFilter,
  updateLowerNavBar,
  updateActiveStringList,
  updateStudentProfile,
  openProfileTabOnClick,
} from '../../../constants/action-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import serverUrl from '../../../config';
import LowerNavBarHome from './LowerNavBarHome';
import LowerNavBarOther from './LowerNavBarOther';
import { history } from '../../../App';
import SuggestedNames from './SuggestedNames';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDropDownOpen: false,
      showSuggestion: true,
      redirect: null,
      loggedout: false,
    };
  }
  showSuggestion = (suggestionstate) => {
    this.setState({
      showSuggestion: suggestionstate,
    });
  };
  componentDidMount() {
    if (localStorage.getItem('userrole') === 'student') {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      axios
        .get(serverUrl + 'student/navbar', {
          params: { StudentID: localStorage.getItem('userId') },
          withCredentials: true,
        })
        .then((response) => {
          const payload1 = {
            studentProfile: {
              CurrentJobTitle: '',
              Name: '',
              PhoneNo: '',
              AboutMe: '',
              Skills: [],
              Website: '',
              StreetAddress: '',
              City: '',
              State: '',
              Country: '',
              Zip: '',
              Disability: '',
              Gender: '',
              Race: [],
              VeteranStatus: '',
              FavouriteJobs: [],
              JobStatus: '',
              PreferredJobTitle: '',
              JobType: [],
              ...response.data[0],
            },
          };
          this.props.updateStudentProfile(payload1);

          let Companies = response.data[1].map((company) => {
            return company.CompanyName;
          });
          let JobTitles = response.data[2].map((job) => {
            return job.Title;
          });
          const payload2 = {
            companyList: Array.from(new Set(Companies)),

            jobTitleList: Array.from(new Set(JobTitles)),
            activeList: Array.from(new Set(JobTitles)),
          };
          this.props.updateActiveStringList(payload2);
          // let payload = {
          //   reviewCount: response.data.reviewCount,
          //   customerProfile,
          // };
          // this.props.getCustomerBasicInfo(payload);
        });
    }
  }

  openFilterDropDown = () => {
    this.setState({
      filterDropDownOpen: !this.state.filterDropDownOpen,
    });
  };

  updateSearchFilter = (event, selectedDropDown) => {
    event.preventDefault();
    let payloadSearchStrings;
    if (selectedDropDown === 'Jobs') {
      payloadSearchStrings = {
        activeList: this.props.searchStringStore.jobTitleList,
      };
    } else {
      payloadSearchStrings = {
        activeList: this.props.searchStringStore.companyList,
      };
    }
    this.props.updateActiveStringList(payloadSearchStrings);
    const payload = {
      selectedDropDown,
    };
    this.props.updateSearcFilter(payload);
  };

  showMainMenu = (event) => {
    event.preventDefault();
    const payload = {
      mainDropDown: !this.props.searchDropDownStore.mainDropDown,
    };
    this.props.updateSearcFilter(payload);
  };

  mainMenuClicked = (event, selectedMenuoption) => {
    // event.preventDefault();
    switch (selectedMenuoption) {
      case 'Sign Out': {
        localStorage.clear();
        axios.post(serverUrl + 'glassdoor/logout').then((response) => {
          if (response.status === 200) {
            this.setState({
              loggedout: true,
            });
          }
        });
        break;
      }
      case 'Profile': {
        history.push('/Profile');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Resumes': {
        history.push('/Profile');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Job Preferences': {
        history.push('/Profile');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Demographics': {
        history.push('/Profile');
        // this.setState({
        //   redirect: '/Profile',
        // });
        localStorage.setItem('openTab', selectedMenuoption);
        let payload = { openTab: selectedMenuoption };
        this.props.openProfileTabOnClick(payload);
        break;
      }
      case 'Contributions': {
        history.push('/Contributions');
        break;
      }
      default: {
        break;
      }
    }
    const payload = {
      mainDropDown: false,
    };
    this.props.updateSearcFilter(payload);
  };

  goToHomePage = () => {
    history.push('/Home');
  };
  selectString = (event, string) => {
    console.log(string);
    event.preventDefault();
    const payload = {
      SearchString: string,
    };
    this.props.updateSearcFilter(payload);
  };

  onChangeCommonHandler = (e) => {
    const payload = {
      [e.target.name]: e.target.value,
    };
    this.props.updateSearcFilter(payload);
  };

  searchResult = (event) => {
    localStorage.setItem('selectedDropDown', this.props.searchDropDownStore.selectedDropDown);
    localStorage.setItem('SearchString', this.props.searchDropDownStore.SearchString);
    localStorage.setItem('Location', this.props.searchDropDownStore.Location);
    switch (this.props.searchDropDownStore.selectedDropDown) {
      case 'Jobs': {
        history.push('/JobList');
        break;
      }
      case 'Companies': {
        history.push('/CompanySearchResults');
        break;
      }
      case 'Salaries': {
        history.push('/salaryList');
        break;
      }
      case 'Interviews': {
        history.push('/interviewList');
        break;
      }
      default:
        break;
    }
  };

  filterStrings = () => {
    return this.props.searchStringStore.activeList.filter((string) =>
      string.toLowerCase().includes(this.props.searchDropDownStore.SearchString.toLowerCase())
    );
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }
    let tabOpen = null;
    // if (this.state.redirect) {
    //   tabOpen = <Redirect to={this.state.redirect} />;
    // }
    let LowerNavBar = null;
    if (this.props.lowerNavbarType.type === 'LowerNavBarHome') {
      LowerNavBar = <LowerNavBarHome />;
    } else {
      LowerNavBar = <LowerNavBarOther />;
    }
    let redirectVar = null;
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'student') {
        redirectVar = null;
      } else if (localStorage.getItem('userrole') === 'company') {
        redirectVar = <Redirect to="/Employer" />;
      }
    }
    if (!localStorage.getItem('token')) {
      redirectVar = <Redirect to="/login" />;
    }
    // let redirectVarLogout = null;
    // if (this.state.loggedout) {
    //   redirectVarLogout = <Redirect to="/login" />;
    // }

    return (
      <header id="SiteNav">
        {redirectVar}
        {tabOpen}
        {localStorage.getItem('token') ? (
          <nav className="d-flex align-items-center memberHeader__HeaderStyles__navigationBackground memberHeader__HeaderStyles__relativePosition">
            <div className="col memberHeader__HeaderStyles__bottomShadow">
              <div className="memberHeader__HeaderStyles__navigationWrapper">
                <div className="d-flex justify-content-between align-items-center px-std px-md-lg memberHeader__HeaderStyles__mainNav">
                  <div className="d-flex order-0 order-md-6">
                    <div className="d-none d-md-flex">
                      <div>
                        <div
                          onClick={this.showMainMenu}
                          className="d-flex "
                          data-test="user-profile-dropdown-trigger"
                        >
                          <span className="SVGInline d-flex icon__IconStyles__colorDefault">
                            <svg
                              className="SVGInline-svg d-flex-svg icon__IconStyles__colorDefault-svg"
                              style={{ width: '36px', height: '36px' }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 19a8.91 8.91 0 01-5.33-1.75 6 6 0 0110.66 0A8.91 8.91 0 0112 21zm6.11-2.4a7 7 0 00-12.22 0 9 9 0 1112.22 0zM12 6a4 4 0 104 4 4 4 0 00-4-4zm0 7a3 3 0 113-3 3 3 0 01-3 3z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </div>
                        <div className="popup__PopupStyles__popupContainer">
                          <div
                            className={`pt-xxsm popup__PopupStyles__popupContent popup__PopupStyles__popupContentRight ${
                              this.props.searchDropDownStore.mainDropDown
                                ? 'popup__PopupStyles__popupContentActive'
                                : ''
                            }`}
                          >
                            <div className="popup__PopupStyles__popupBackground">
                              <div style={{ width: '100%' }} className="d-flex flex-column col">
                                <div className="accountPopup__AccountPopupStyles__menuContainer">
                                  <div className="accountPopup__AccountPopupStyles__accountMenu accountPopup__AccountPopupStyles__active">
                                    <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => {
                                          this.mainMenuClicked(event, 'Profile');
                                        }}
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          // to="/Profile"
                                          // to="#"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="My Profile"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Profile
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        style={{ cursor: 'pointer' }}
                                        onClick={(event) => this.mainMenuClicked(event, 'Resumes')}
                                        className="p-0 m-0"
                                      >
                                        <a
                                          // to="/Resume"
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="My Resumes"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Resumes
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.mainMenuClicked(event, 'Job Preferences')
                                        }
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Job Preferences"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Job Preferences
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.mainMenuClicked(event, 'Demographics')
                                        }
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="#"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Demographics"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Demographics
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                    <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        onClick={(event) =>
                                          this.mainMenuClicked(event, 'Contributions')
                                        }
                                        className="p-0 m-0"
                                      >
                                        <a
                                          href="#"
                                          // to="/ContributionPage"
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          // href="/member/account/salaries_input.htm"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Contributions"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Contributions
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.mainMenuClicked(event, 'Company Follows')
                                        }
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="/member/account/followedCompanies_input.htm"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Company Follows"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Company Follows
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                    <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        onClick={(event) =>
                                          this.mainMenuClicked(event, 'Account Settings')
                                        }
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="/member/account/settings_input.htm"
                                          target="_top"
                                          rel="nofollow"
                                          data-ga-lbl="Account"
                                          data-test="account-settings"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Account Settings
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                    <ul className="p-0 m-0 memberHeader__HeaderStyles__list">
                                      <li
                                        onClick={(event) => this.mainMenuClicked(event, 'Sign Out')}
                                        className="p-0 m-0"
                                      >
                                        <a
                                          className="d-flex align-items-center px-std menuItem__MenuItemStyles__menuItem menuItem__MenuItemStyles__menuItemHoverEffect header-menu-item"
                                          href="/logout.htm"
                                          target=""
                                          rel=""
                                          data-ga-lbl="Sign Out"
                                          data-test="sign-out"
                                        >
                                          <div className="d-flex align-items-center py-std col header-menu-item-label">
                                            <span className="col">
                                              <span className="menuItem__MenuItemStyles__menuItemColor">
                                                Sign Out
                                              </span>
                                            </span>
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="accountPopup__AccountPopupStyles__notificationMenu accountPopup__AccountPopupStyles__inactive">
                                    <div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex order-1 order-md-5">
                    <div className="d-none d-md-flex">
                      <div className="mr-std">
                        <div
                          data-test="notifications-tray"
                          className="notification__NotificationStyles__notificationsIconContainer"
                        >
                          <span className="SVGInline d-flex icon__IconStyles__colorDefault">
                            <svg
                              className="SVGInline-svg d-flex-svg icon__IconStyles__colorDefault-svg"
                              style={{ width: '36px', height: '36px' }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M17.61 6H6.39a1 1 0 00-.94.65L3 11h3.28a1 1 0 011 .68v.06l.15.45.57 1.72a.13.13 0 00.12.09h7.82a.13.13 0 00.12-.09l.74-2.23a1 1 0 01.95-.68H21l-2.45-4.35a1 1 0 00-.94-.65zM3 17a1 1 0 001 1h16a1 1 0 001-1v-5h-3.21a.1.1 0 00-.09.07l-.7 2.25a1 1 0 01-1 .68H8a1 1 0 01-1-.69l-.7-2.24a.1.1 0 00-.09-.07H3zm19 0a2 2 0 01-2 2H4a2 2 0 01-2-2v-6l2.51-4.7A2 2 0 016.39 5h11.22a2 2 0 011.88 1.3L22 11z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex order-2 memberHeader__HeaderStyles__brandLogoContainer">
                    <a
                      onClick={this.goToHomePage}
                      href="#"
                      // to="/Home"
                      alt=""
                      target="_top"
                      rel="nofollow"
                      data-test="header-glassdoor-logo"
                      aria-label="Glassdoor Logo"
                    >
                      <span className="SVGInline d-flex align-items-center memberHeader__HeaderStyles__brandLogo">
                        <svg
                          className="SVGInline-svg d-flex-svg align-items-center-svg memberHeader__HeaderStyles__brandLogo-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="122"
                          height="24"
                          viewBox="0 0 163 32"
                        >
                          <g fill="#0CAA41" fillRule="evenodd">
                            <path
                              id="prefix__icon-logo-glassdoor-1"
                              d="M163 7.366a.55.55 0 00-.285-.447c-.37-.182-.908-.307-2.005-.307-2.475 0-4.664 1.211-5.619 3.237V7.374a.39.39 0 00-.393-.388h-3.706a.39.39 0 00-.393.388v16.684a.39.39 0 00.393.388h3.882a.391.391 0 00.394-.388v-7.505c0-3.352 2.366-5.018 5.442-5.018a6.37 6.37 0 011.794.274c.246.08.496-.12.496-.376V7.366zm-24.807 12.986c-2.653 0-4.705-1.85-4.705-4.644s2.053-4.645 4.705-4.645c2.653 0 4.704 1.852 4.704 4.645 0 2.794-2.051 4.644-4.704 4.644zm0-13.794c-5.447 0-9.515 3.702-9.515 9.15s4.068 9.15 9.515 9.15c5.446 0 9.514-3.702 9.514-9.15s-4.068-9.15-9.514-9.15zm-21.6 13.794c-2.653 0-4.705-1.85-4.705-4.644 0-2.793 2.052-4.644 4.705-4.644s4.704 1.85 4.704 4.644-2.051 4.644-4.704 4.644zm0-13.794c-5.447 0-9.515 3.702-9.515 9.15s4.068 9.15 9.515 9.15c5.446 0 9.514-3.702 9.514-9.15s-4.068-9.15-9.514-9.15zm-21.57 13.837c-2.652 0-4.633-1.85-4.633-4.68 0-2.828 1.981-4.68 4.634-4.68 2.618 0 4.633 1.782 4.633 4.68 0 2.864-2.015 4.68-4.633 4.68zM103.792.001H99.91a.39.39 0 00-.392.388V9.5c-1.203-1.676-3.184-2.969-5.943-2.969-4.315 0-7.994 3.284-7.994 9.186 0 5.901 3.68 9.183 8.064 9.183 2.583 0 4.6-1.117 5.872-2.898v2.057a.39.39 0 00.393.388h3.882a.39.39 0 00.393-.388V.39a.39.39 0 00-.393-.389zM83.01 19.161c0 3.981-2.936 5.693-7.64 5.693-3.249 0-6.044-.864-7.643-2.651a.395.395 0 01-.01-.504l2.244-2.877a.39.39 0 01.589-.022c1.187 1.199 3.01 1.932 5.28 1.932 1.309 0 2.37-.348 2.37-1.326 0-.944-.955-1.152-3.926-1.781-2.618-.525-5.872-1.711-5.872-5.518 0-3.527 2.83-5.553 7.464-5.553 3.047 0 5.238.908 6.783 2.338a.39.39 0 01.037.526l-2.13 2.73a.386.386 0 01-.558.06c-1.045-.92-2.78-1.498-4.486-1.498-1.45 0-2.264.455-2.264 1.223 0 .873.956 1.083 4.104 1.746 3.076.663 5.658 1.816 5.658 5.482zm-17.952.01c0 3.981-2.936 5.693-7.64 5.693-3.249 0-6.044-.864-7.643-2.651a.395.395 0 01-.01-.503l2.244-2.878a.391.391 0 01.589-.022c1.187 1.2 3.01 1.933 5.28 1.933 1.309 0 2.37-.349 2.37-1.327 0-.944-.955-1.152-3.926-1.781-2.618-.524-5.872-1.711-5.872-5.518 0-3.527 2.83-5.552 7.464-5.552 3.046 0 5.237.908 6.782 2.337a.39.39 0 01.037.526l-2.13 2.73a.386.386 0 01-.557.061c-1.045-.92-2.78-1.5-4.487-1.5-1.45 0-2.264.456-2.264 1.224 0 .873.957 1.083 4.104 1.746 3.076.663 5.659 1.816 5.659 5.482zm-23.268-1.78c0 1.92-1.59 3.597-4.067 3.597-1.627 0-2.512-.734-2.512-1.851 0-.978.744-1.712 2.194-1.922l4.385-.523v.699zM38.713 6.6c-3.704 0-6.495 1.224-7.742 3.643a.392.392 0 00.129.495l2.83 1.996c.178.125.428.084.535-.105.786-1.397 2.547-1.874 4.248-1.874 2.087 0 3.076.732 3.076 1.746v.279c0 .42-.247.63-.919.699l-4.846.419c-3.254.313-5.658 2.304-5.658 5.482 0 3.213 2.475 5.448 5.977 5.448 2.759 0 4.527-1.327 5.446-2.724v1.987a.39.39 0 00.393.388h3.883a.39.39 0 00.393-.388V13.689c0-4.854-2.582-7.089-7.745-7.089zM27.163.387v23.668a.39.39 0 01-.393.389h-3.918a.39.39 0 01-.393-.389V.38c0-.21.173-.38.385-.38h3.926a.39.39 0 01.393.388zm-17.72 19.99c-2.652 0-4.633-1.851-4.633-4.68 0-2.829 1.98-4.68 4.633-4.68s4.598 1.782 4.598 4.68c0 2.863-1.945 4.68-4.598 4.68zm8.768-13.41h-3.878a.396.396 0 00-.398.393v2.052c-.99-1.572-3.042-2.864-5.765-2.864-4.386 0-8.17 3.248-8.17 9.08C0 21.424 3.607 24.6 8.311 24.6c2.547 0 4.527-1.047 5.695-2.688v1.117c0 2.514-1.239 4.505-5.2 4.505-1.991 0-3.59-.654-4.992-1.88a.388.388 0 00-.59.082l-1.759 2.91c-.227.376-.196.587-.052.711 1.806 1.55 4.155 2.507 7.57 2.507 7.428 0 9.621-4.085 9.621-8.59V7.355a.39.39 0 00-.393-.388z"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </a>
                  </div>

                  <div className="d-flex col justify-content-end order-3">
                    <div className="d-flex d-md-none pr-std">
                      <button
                        type="button"
                        className="p-0 search__SearchStyles__iconBtn"
                        data-test="icon-search-menu-open-trigger"
                      >
                        <span className="SVGInline d-flex search__SearchStyles__colorDefault">
                          <svg
                            className="SVGInline-svg d-flex-svg search__SearchStyles__colorDefault-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M10.5 3a7.5 7.5 0 107.5 7.5A7.5 7.5 0 0010.5 3zm0-1a8.5 8.5 0 016.35 14.15l5 5a.5.5 0 010 .7.5.5 0 01-.71 0l-5-5A8.5 8.5 0 1110.5 2z"
                              fill="currentColor"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>

                    <div className="d-none d-md-flex d-lg-none px-xxl py-std col search__SearchStyles__searchForm">
                      <div
                        className="d-flex col search__SearchStyles__searchKeywordContainer"
                        data-test="input-search-menu-open-trigger"
                      >
                        <label className="d-flex align-items-center search__SearchStyles__searchInputLabel">
                          <span className="SVGInline d-flex search__SearchStyles__searchIcon">
                            <svg
                              className="SVGInline-svg d-flex-svg search__SearchStyles__searchIcon-svg"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M10.5 3a7.5 7.5 0 107.5 7.5A7.5 7.5 0 0010.5 3zm0-1a8.5 8.5 0 016.35 14.15l5 5a.5.5 0 010 .7.5.5 0 01-.71 0l-5-5A8.5 8.5 0 1110.5 2z"
                                fill="currentColor"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <div className="col headerSearchInput css-1ohf0ui">
                          <div className="input-wrapper css-q444d9">
                            <input
                              type="text"
                              placeholder="Job Title, Keywords, or Company"
                              data-test=""
                              aria-label=""
                              className="css-1etjok6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-none d-lg-flex col px-xxl py-std ">
                      <div
                        // onSubmit={(event) => event.preventDefault()}
                        id="scBar"
                        // method="GET"
                        // target="_top"
                        novalidate=""
                        className="col search__SearchStyles__searchForm"
                        data-test="search-bar-form"
                      >
                        <div className="d-flex flex-row align-items-center">
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <input type="hidden" />
                          <div className="d-flex col-6 p-0 search__SearchStyles__searchKeywordContainer">
                            <label
                              htmlFor="sc.keyword"
                              className="d-flex align-items-center search__SearchStyles__searchInputLabel"
                            >
                              <span className="SVGInline d-flex search__SearchStyles__searchIcon">
                                <svg
                                  className="SVGInline-svg d-flex-svg search__SearchStyles__searchIcon-svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M10.5 3a7.5 7.5 0 107.5 7.5A7.5 7.5 0 0010.5 3zm0-1a8.5 8.5 0 016.35 14.15l5 5a.5.5 0 010 .7.5.5 0 01-.71 0l-5-5A8.5 8.5 0 1110.5 2z"
                                    fill="currentColor"
                                    fillRule="evenodd"
                                  ></path>
                                </svg>
                              </span>
                            </label>
                            <div className="col headerSearchInput css-1ohf0ui">
                              <div className="input-wrapper css-q444d9">
                                <input
                                  // onFocus={() => this.showSuggestion(true)}
                                  // onBlur={() => this.showSuggestion(false)}
                                  onChange={this.onChangeCommonHandler}
                                  type="text"
                                  id="sc.keyword"
                                  name="SearchString"
                                  placeholder="Job Title, Keywords, or Company"
                                  data-test="search-bar-keyword-input"
                                  aria-label=""
                                  value={this.props.searchDropDownStore.SearchString}
                                  className="css-1etjok6"
                                  autoComplete="off"
                                />
                                <SuggestedNames
                                  showSuggestion={this.state.showSuggestion}
                                  searchStrings={this.filterStrings()}
                                  selectString={(event, string) => this.selectString(event, string)}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={this.openFilterDropDown}
                            className="ml-xsm search__SearchStyles__searchDropdown css-1ohf0ui"
                          >
                            <select
                              data-test="search-bar-context-picker"
                              name="dropdown"
                              style={{ display: 'none' }}
                              aria-label=""
                            >
                              <option value="0"></option>
                              <option value="1"></option>
                              <option value="2"></option>
                              <option value="3"></option>
                            </select>
                            <div
                              tabindex="0"
                              style={{ width: '132px' }}
                              direction="auto"
                              aria-expanded="false"
                              role="listbox"
                              aria-activedescendant="option_0_70d7575-d1fd-b3f8-b731-6ee81f80f30"
                              aria-label=""
                              className="css-1o72mdj"
                            >
                              <div className="selectedLabel">
                                {this.props.searchDropDownStore.selectedDropDown}
                                <span
                                  alt=""
                                  style={
                                    this.state.filterDropDownOpen
                                      ? { transform: 'rotate(180deg)' }
                                      : {}
                                  }
                                  className="SVGInline arrowDown"
                                >
                                  <svg
                                    className="SVGInline-svg arrowDown-svg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                      fillRule="evenodd"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </span>
                                {/*<span alt="" className="SVGInline arrowUp">
                                <svg
                                  className={`SVGInline-svg ${this.state.filterDropDownOpen
                                      ? 'arrowUp - svg'
                                      : 'arrowDown-svg'
                                    }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                    fillRule="evenodd"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                                  </span>*/}
                              </div>
                              {this.state.filterDropDownOpen ? (
                                <div className="dropdownOptions dropdownExpanded animated  ">
                                  <div className="dropDownOptionsContainer">
                                    <ul>
                                      <li
                                        onClick={(event) => this.updateSearchFilter(event, 'Jobs')}
                                        className={`dropdownOption  ${
                                          this.props.searchDropDownStore.selectedDropDown === 'Jobs'
                                            ? 'checked'
                                            : ''
                                        } `}
                                        role="option"
                                        aria-selected="true"
                                        id="option_0"
                                      >
                                        <div className="checkmark">
                                          <span alt="" className="SVGInline">
                                            <svg
                                              className="SVGInline-svg"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>

                                        <span className="dropdownOptionLabel">Jobs</span>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.updateSearchFilter(event, 'Companies')
                                        }
                                        className={
                                          this.props.searchDropDownStore.selectedDropDown ===
                                          'Companies'
                                            ? 'dropdownOption   checked'
                                            : 'dropdownOption'
                                        }
                                        role="option"
                                        aria-selected="false"
                                        id="option_1"
                                      >
                                        <div className="checkmark">
                                          <span alt="" className="SVGInline">
                                            <svg
                                              className="SVGInline-svg"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>

                                        <span className="dropdownOptionLabel">Companies</span>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.updateSearchFilter(event, 'Salaries')
                                        }
                                        className={`dropdownOption  ${
                                          this.props.searchDropDownStore.selectedDropDown ===
                                          'Salaries'
                                            ? 'checked'
                                            : ''
                                        } `}
                                        role="option"
                                        aria-selected="false"
                                        id="option_2"
                                      >
                                        <div className="checkmark">
                                          <span alt="" className="SVGInline">
                                            <svg
                                              className="SVGInline-svg"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                        <span className="dropdownOptionLabel">Salaries</span>
                                      </li>
                                      <li
                                        onClick={(event) =>
                                          this.updateSearchFilter(event, 'Interviews')
                                        }
                                        className={`dropdownOption  ${
                                          this.props.searchDropDownStore.selectedDropDown ===
                                          'Interviews'
                                            ? 'checked'
                                            : ''
                                        } `}
                                        role="option"
                                        aria-selected="false"
                                        id="option_3"
                                      >
                                        <div className="checkmark">
                                          <span alt="" className="SVGInline">
                                            <svg
                                              className="SVGInline-svg"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                d="M9.89 15.76l-2.64-2.363a.793.793 0 010-1.157.884.884 0 011.211 0l2.039 1.785 5.039-5.785a.884.884 0 011.21 0 .793.793 0 010 1.157L11.1 15.76a.884.884 0 01-1.21 0z"
                                                fill="currentColor"
                                                fillRule="evenodd"
                                              ></path>
                                            </svg>
                                          </span>
                                        </div>
                                        <span className="dropdownOptionLabel">Interviews</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                          <div className="ml-xsm col-4 p-0 headerSearchInput search__SearchStyles__searchBarLocationInput css-1ohf0ui">
                            <div className="input-wrapper css-q444d9">
                              <input
                                onChange={this.onChangeCommonHandler}
                                name="Location"
                                type="text"
                                id="sc.location"
                                placeholder="Location"
                                data-test="search-bar-location-input"
                                aria-label=""
                                value={this.props.searchDropDownStore.Location}
                                className="css-1etjok6"
                                autoComplete="off"
                              />
                              <div
                                style={{
                                  left: '0px',
                                  top: '41px',
                                  width: '266px',
                                }}
                                className="autoComplete-suggestions "
                              ></div>
                            </div>
                          </div>
                          <a href="#" onClick={this.searchResult}>
                            <button
                              className="gd-ui-button ml-std col-auto css-iixdfr"
                              // type="submit"
                              data-test="search-bar-submit"
                            >
                              <span>Search</span>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          ''
        )}
        {localStorage.getItem('token') ? LowerNavBar : ''}
      </header>
    );
  }
}

// export default Navbar;
const mapStateToProps = (state) => {
  const { searchDropDownStore } = state.searchDropDownReducer;
  const { lowerNavbarType } = state.lowerNavBarReducer;
  const { searchStringStore } = state.SearchStringsReducer;
  return {
    searchDropDownStore,
    searchStringStore,
    lowerNavbarType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSearcFilter: (payload) => {
      dispatch({
        type: updateSearcFilter,
        payload,
      });
    },
    updateLowerNavBar: (payload) => {
      dispatch({
        type: updateLowerNavBar,
        payload,
      });
    },
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
    updateActiveStringList: (payload) => {
      dispatch({
        type: updateActiveStringList,
        payload,
      });
    },
    openProfileTabOnClick: (payload) => {
      dispatch({
        type: openProfileTabOnClick,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
