import React, { Component } from 'react';
import PaginationComponent from '../Common/PaginationComponent';
import './JobLeftResultsBlock.css';
import JobResultCard from './JobResultCard';
import { connect } from 'react-redux';
import { updateJobListStore } from '../../../constants/action-types';

class JobLeftResultsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  commonFetch = (PageNo = 0) => {
    let payload = {
      jobList: [{ name: 'pr' }, { name: 'pr' }, { name: 'pr' }, { name: 'pr' }],
      PageNo,
      PageCount: Math.ceil(116 / 10),
      Totalcount: 116,

      // PageCount: Math.ceil(response.data.Totalcount / 3),
    };
    this.props.updateJobListStore(payload);
  };

  componentDidMount() {
    this.commonFetch();
  }

  onPageClick = (e) => {
    // console.log('Page Clicked:', e.selected);
    this.commonFetch(e.selected);
  };
  render() {
    return (
      <article style={{ paddingRight: '1 % !important' }} id="MainCol" className="noPad">
        <div>
          <div id="MainColSummary" className="gdGrid">
            <h1 id="jobTitle" className="hidden">
              Software engineer Jobs
            </h1>
            <p className="jobsCount hidden">111,956Jobs</p>
            <div className="css-8atqhb">
              <div className="d-flex align-items-center justify-content-between css-1530je5 ey9ulmr0">
                <div className="css-e0vuny e1gtdke62">
                  <div data-test="sort-by-header" className="css-150lexj e1gtdke60">
                    <span className="SVGInline">
                      <svg
                        className="SVGInline-svg"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 5a1 1 0 010 2H3a1 1 0 010-2zm-6 6a1 1 0 010 2H3a1 1 0 010-2zm-4 6a1 1 0 010 2H3a1 1 0 010-2z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span>Most Relevant</span>
                  </div>
                </div>
                <div data-test="jobCount-H1title" className="hideHH css-19rczgc e15r6eig0">
                  111956 Software Engineer Jobs
                </div>
              </div>
              <span></span>
            </div>
          </div>
          <ul className="jlGrid hover p-0 ">
            {this.props.jobListStore.jobList.map((job) => (
              <JobResultCard saveJob={(event) => this.props.saveJob(event, job._id /**JobID */)} />
            ))}
          </ul>
        </div>
        <div className="tbl fill padHorz margVert" id="ResultsFooter">
          <div className="cell middle hideMob padVertSm" data-test="page-x-of-y">
            Page 1 of 30
          </div>
          <div className="cell alignRt middle">
            <PaginationComponent
              PageCount={this.props.jobListStore.PageCount}
              PageNo={this.props.jobListStore.PageNo}
              onPageClick={(e) => {
                this.onPageClick(e);
              }}
            />
          </div>
        </div>
      </article>
    );
  }
}

const mapStateToProps = (state) => {
  const { jobListStore } = state.JobSearchPageReducer;
  return {
    jobListStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateJobListStore: (payload) => {
      dispatch({
        type: updateJobListStore,
        payload,
      });
    },
  };
};

// export default LoginBody;
export default connect(mapStateToProps, mapDispatchToProps)(JobLeftResultsBlock);

// export default JobLeftResultsBlock;