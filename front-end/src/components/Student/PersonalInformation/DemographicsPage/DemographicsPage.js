import React, { Component } from 'react';
import './DemographicsPage.css';
import ReactTooltip from 'react-tooltip';
import RaceEthinicityFormModal from './RaceEthinicityFormModal';
import GenderFormModal from './GenderFormModal';
import DisabilityFormModal from './DisabilityFormModal';
import VeteranStatusFormModal from './VeteranStatusFormModal';
import { connect } from 'react-redux';
import glassdoorDemographics from './glassdoorDemographics.png';

class DemographicsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { openForm: null };
  }

  openForm = (event, formName) => {
    event.preventDefault();
    this.setState({
      openForm: formName,
    });
  };
  updateStudentProfile = (event, student) => {
    event.preventDefault();
    console.log(student);
    this.setState({
      openForm: null,
    });
  };

  render() {
    let genderOutput = null;
    if (this.props.studentInfoStore.studentProfile.Gender.length > 0) {
      switch (this.props.studentInfoStore.studentProfile.Gender) {
        case 'Yes': {
          genderOutput = (
            <div class="css-ewb0zt eqb0scq0">
              <span class="user-answer">Yes</span>, I do have a disability
            </div>
          );

          break;
        }
        case 'No': {
          genderOutput = (
            <div class="css-ewb0zt eqb0scq0">
              <span class="user-answer">No</span>, I do not have a disability
            </div>
          );

          break;
        }
        case 'Prefer Not to Say': {
          genderOutput = (
            <div class="css-ewb0zt eqb0scq0">
              <span class="user-answer">Prefer Not to Say</span>
            </div>
          );

          break;
        }
        default:
          break;
      }
    }
    return (
      <div className="col-12 col-md-8">
        <main class>
          <section class="SectionStyles__section___3ZANh px-std px-md-0 my-lg mt-md-0 mb-md-md">
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex align-items-center no-gutters pb-lg pb-md-sm SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class="d-flex flex-row justify-content-between justify-content-md-start align-items-center css-1de38ma e1xtvuzq0">
                  <h1>Demographics</h1>
                  <div class="ml-sm css-c6vx2p ex4arsv0" type="Private">
                    Private
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="SectionStyles__section___3ZANh d-flex no-gutters px-std px-md-0 mt-lg mt-md-0 mb-xl">
            <div class="col-12 col-md-6 d-flex flex-column justify-content-start css-1bhc1yn e1u3hvor0">
              <h2>Help End Inequality</h2>
              <p>
                Shine a light on inequities in the workplace. Anonymously share your demographics to
                help pinpoint pay and diversity disparities.
              </p>
              <p>
                <span>
                  Providing your demographic information is optional and, if provided, it will not
                  be shared with employers. This information will be collected and used in
                  accordance with our .
                </span>
              </p>
            </div>
            <div className="d-none d-md-block col-md-6 d-flex justify-content-center align-items-center css-1sjjfxl e1u3hvor1">
              <img src={glassdoorDemographics} alt={'glassdoorDemographics'}></img>
            </div>
          </section>
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mb-xl"
            data-test="demographicGender"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex justify-content-between align-items-center no-gutters mb-md SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class="css-1lxb3nk eu9pv1u0">
                  <h2>Race/Ethnicity</h2>
                </div>
              </div>
              {this.props.studentInfoStore.studentProfile.Race.length === 0 ? (
                <button
                  onClick={(event) => this.openForm(event, 'RaceEthinicityFormModal')}
                  class="SectionHeaderStyles__addIcon___2YMd- p-0 css-1d45jd4 espki3r0"
                >
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                        <path
                          d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                          stroke="#1861bf"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  onClick={(event) => this.openForm(event, 'RaceEthinicityFormModal')}
                  class="SectionHeaderStyles__editIcon___LCEeu p-0 css-1d45jd4 espki3r0"
                >
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor" fill-rule="evenodd">
                        <path
                          id="prefix__icon-edit"
                          d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              )}
            </div>
            {this.props.studentInfoStore.studentProfile.Race.length === 0 ? (
              <button
                style={{ cursor: 'pointer' }}
                onClick={(event) => this.openForm(event, 'RaceEthinicityFormModal')}
                class="no-gutters m-0 p-0 d-flex justify-content-start align-items-center e1q9njc70 css-rm509o espki3r0"
              >
                <div class="d-flex justify-content-center mr-xsm css-1q1dol4 e1q9njc71">
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                        <path
                          d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                          stroke="#1861bf"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <div class="d-flex justify-content-start css-1h3h083 e1q9njc72">
                  Add race/ethnicity
                </div>
              </button>
            ) : (
              <div class="css-ewb0zt eqb0scq0">
                I identify my race or ethnicity as:
                <span class="user-answer">
                  {this.props.studentInfoStore.studentProfile.Race.join()}
                </span>
              </div>
            )}
          </section>
          {this.state.openForm === 'RaceEthinicityFormModal' ? (
            <RaceEthinicityFormModal
              updateStudentProfile={(event, student) => this.updateStudentProfile(event, student)}
              openForm={(event) => this.openForm(event, null)}
            />
          ) : (
            ''
          )}
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mb-xl"
            data-test="demographicGender"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex justify-content-between align-items-center no-gutters mb-md SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class="css-1lxb3nk eu9pv1u0">
                  <h2>Gender</h2>
                </div>
              </div>
              {this.props.studentInfoStore.studentProfile.Gender.length === 0 ? (
                <button
                  onClick={(event) => this.openForm(event, 'GenderFormModal')}
                  class="SectionHeaderStyles__addIcon___2YMd- p-0 css-1d45jd4 espki3r0"
                >
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                        <path
                          d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                          stroke="#1861bf"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              ) : (
                <button
                  onClick={(event) => this.openForm(event, 'GenderFormModal')}
                  class="SectionHeaderStyles__editIcon___LCEeu p-0 css-1d45jd4 espki3r0"
                >
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor" fill-rule="evenodd">
                        <path
                          id="prefix__icon-edit"
                          d="M14.775 6.202l2.99 2.99-11.81 11.663a.499.499 0 01-.352.144H3.498a.5.5 0 01-.5-.5v-2.342a.5.5 0 01.147-.354l11.63-11.6zM16.19 4.79l1.641-1.638a.502.502 0 01.707 0l2.3 2.298a.5.5 0 010 .707l-.003.003-1.648 1.627L16.19 4.79z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </button>
              )}
            </div>
            {this.props.studentInfoStore.studentProfile.Gender.length === 0 ? (
              <button
                style={{ cursor: 'pointer' }}
                onClick={(event) => this.openForm(event, 'GenderFormModal')}
                class="no-gutters m-0 p-0 d-flex justify-content-start align-items-center e1q9njc70 css-rm509o espki3r0"
              >
                <div class="d-flex justify-content-center mr-xsm css-1q1dol4 e1q9njc71">
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                        <path
                          d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                          stroke="#1861bf"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
                <div class="d-flex justify-content-start css-1h3h083 e1q9njc72">
                  Add gender identity
                </div>
              </button>
            ) : (
              { genderOutput }
            )}
          </section>
          {this.state.openForm === 'GenderFormModal' ? (
            <GenderFormModal
              updateStudentProfile={(event, student) => this.updateStudentProfile(event, student)}
              openForm={(event) => this.openForm(event, null)}
            />
          ) : (
            ''
          )}
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mb-xl"
            data-test="DemographicDisability"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex justify-content-between align-items-center no-gutters mb-md SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class="css-1lxb3nk eu9pv1u0">
                  <h2>Disability</h2>
                </div>
                <div data-tip data-for="registerTip" class="css-79elbk evidjxy0">
                  <span class="SVGInline">
                    <svg
                      class="SVGInline-svg"
                      style={{ width: '36px', height: '36px' }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 9a1 1 0 101 1 1 1 0 00-1-1zm0 3a1 1 0 00-1 1v2a1 1 0 002 0v-2a1 1 0 00-1-1zm0-6a6 6 0 11-6 6 6 6 0 016-6zm0 11a5 5 0 10-5-5 5 5 0 005 5z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <ReactTooltip
                    id="registerTip"
                    place="top"
                    effect="solid"
                    textColor="black"
                    backgroundColor="white"
                    wrapper="div"
                  >
                    <div style={{ background: 'solid', width: '450px', opacity: '1 !important' }}>
                      {' '}
                      Disabilities include, but are not limited to: Blindness, Deafness, Cancer,
                      Diabetes, Epilepsy, Autism, Cerebral palsy, Schizophrenia, Muscular dystrophy,
                      Bipolar disorder, Major depression, Multiple sclerosis (MS), Missing limbs or
                      partially missing limbs, Post-traumatic stress disorder (PTSD), Obsessive
                      compulsive disorder, Impairments requiring the use of a wheelchair, or
                      Intellectual disability (previously called mental retardation).
                    </div>
                  </ReactTooltip>
                </div>
              </div>
              <button
                onClick={(event) => this.openForm(event, 'DisabilityFormModal')}
                class="SectionHeaderStyles__addIcon___2YMd- p-0 css-1d45jd4 espki3r0"
              >
                <span class="SVGInline">
                  <svg
                    class="SVGInline-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            <button
              style={{ cursor: 'pointer' }}
              onClick={(event) => this.openForm(event, 'DisabilityFormModal')}
              class="no-gutters m-0 p-0 d-flex justify-content-start align-items-center e1q9njc70 css-rm509o espki3r0"
            >
              <div class="d-flex justify-content-center mr-xsm css-1q1dol4 e1q9njc71">
                <span class="SVGInline">
                  <svg
                    class="SVGInline-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              <div class="d-flex justify-content-start css-1h3h083 e1q9njc72">Add disability</div>
            </button>
          </section>
          {this.state.openForm === 'DisabilityFormModal' ? (
            <DisabilityFormModal
              updateStudentProfile={(event, student) => this.updateStudentProfile(event, student)}
              openForm={(event) => this.openForm(event, null)}
            />
          ) : (
            ''
          )}
          <section
            class="SectionStyles__section___3ZANh px-std px-md-0 mt-lg mb-xl"
            data-test="demographicVeteran"
          >
            <div
              class="SectionHeaderStyles__sectionHeader___3b_50 d-flex justify-content-between align-items-center no-gutters mb-md SectionHeaderStyles__bordered___3i8xM"
              data-test="sectionHeader"
            >
              <div class="d-flex justify-content-start align-items-center">
                <div class="css-1lxb3nk eu9pv1u0">
                  <h2>Veteran Status</h2>
                </div>
              </div>
              <button
                onClick={(event) => this.openForm(event, 'VeteranStatusFormModal')}
                class="SectionHeaderStyles__addIcon___2YMd- p-0 css-1d45jd4 espki3r0"
              >
                <span class="SVGInline">
                  <svg
                    class="SVGInline-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
            <button
              style={{ cursor: 'pointer' }}
              onClick={(event) => this.openForm(event, 'VeteranStatusFormModal')}
              class="no-gutters m-0 p-0 d-flex justify-content-start align-items-center e1q9njc70 css-rm509o espki3r0"
            >
              <div class="d-flex justify-content-center mr-xsm css-1q1dol4 e1q9njc71">
                <span class="SVGInline">
                  <svg
                    class="SVGInline-svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <circle cx="12" cy="12" fill="#f5f6f7" r="12"></circle>
                      <path
                        d="M12.5 12.5H18h-5.5V7zm0 0V18v-5.5H7z"
                        stroke="#1861bf"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
              <div class="d-flex justify-content-start css-1h3h083 e1q9njc72">
                Add veteran status
              </div>
            </button>
          </section>
          {this.state.openForm === 'VeteranStatusFormModal' ? (
            <VeteranStatusFormModal
              updateStudentProfile={(event, student) => this.updateStudentProfile(event, student)}
              openForm={(event) => this.openForm(event, null)}
            />
          ) : (
            ''
          )}
          <div class=" en931v50 gd-ui-module css-1vtbhsq">
            <h2>Remove My Demographic Information</h2>If you no longer want to share your personal
            diversity and inclusion information with Glassdoor, you can remove or delete all of it
            by clicking below. You are welcome to update your information at any time.
            <button class="gd-ui-button d-block mt-lg css-3ybntp">Remove All</button>
          </div>
        </main>
      </div>
    );
  }
}

// export default DemographicsPage;
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { masterData } = state.staticDataReducer;

  return {
    studentInfoStore,
    masterData,
  };
};

export default connect(mapStateToProps, null)(DemographicsPage);