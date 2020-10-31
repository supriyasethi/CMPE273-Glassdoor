import React, { Component } from 'react';
import './JobResultCard.css';

class JobResultCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let saved = (
      <path
        d="M20.37 4.65a5.57 5.57 0 00-7.91 0l-.46.46-.46-.46a5.57 5.57 0 00-7.91 0 5.63 5.63 0 000 7.92L12 21l8.37-8.43a5.63 5.63 0 000-7.92z"
        fill="currentColor"
        fill-rule="evenodd"
      ></path>
    );
    return (
      <li
        className="jl react-job-listing gdGrid selected"
        data-brandviews="BRAND:n=jsearch-job-listing:eid=1277356:jlid=3360350142"
        data-id="3360350142"
        data-adv-type="EMPLOYER"
        data-is-organic-job="false"
        data-ad-order-id="1131672"
        data-sgoc-id="1007"
        data-is-easy-apply="false"
        data-normalize-job-title="Software Engineer"
        data-job-loc="Pittsburgh, PA"
        data-job-loc-id="1152990"
        data-job-loc-type="C"
        style={{}}
      >
        <div className="d-flex flex-column css-fbt9gv e1rrn5ka2">
          <a
            href="/partner/jobListing.htm?pos=101&amp;ao=1131672&amp;s=149&amp;guid=000001756bc2a114bc220f15246b43c4&amp;src=GD_JOB_AD&amp;t=SRFJ&amp;vt=w&amp;uido=5B485F458EBD641B&amp;cs=1_96b751a7&amp;cb=1603830720282&amp;jobListingId=3360350142"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="jobLink"
            style={{ pointerEvents: 'all' }}
          >
            <span className=" css-9ujsbx euyrj9o1">
              <img
                src="https://media.glassdoor.com/sql/1277356/roadrunner-recycling-squarelogo-1534260402401.png"
                alt="RoadRunner Recycling Logo"
                title="RoadRunner Recycling Logo"
              />
            </span>
          </a>
          <span className="compactStars ">
            4.2<i className="star"></i>
          </span>
        </div>
        <div className="d-flex flex-column pl-sm css-nq3w9f">
          <div className="jobHeader d-flex justify-content-between align-items-start">
            <a
              href="/partner/jobListing.htm?pos=101&amp;ao=1131672&amp;s=149&amp;guid=000001756bc2a114bc220f15246b43c4&amp;src=GD_JOB_AD&amp;t=SRFJ&amp;vt=w&amp;uido=5B485F458EBD641B&amp;cs=1_96b751a7&amp;cb=1603830720282&amp;jobListingId=3360350142"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className=" css-10l5u4p e1n63ojh0 jobLink"
              style={{ pointerEvents: 'all' }}
            >
              <span>RoadRunner Recycling</span>
            </a>
            <div
              onClick={(event) => this.props.saveJob(event)}
              className="saveJobWrap align-self-end d-flex flex-nowrap align-items-start"
            >
              <span className="save-job-button-3360350142 nowrap" data-test="save-job">
                <span className="SVGInline css-9th5vf">
                  <svg
                    className="SVGInline-svg css-9th5vf-svg"
                    style={{ width: '20px', height: '20px' }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 5.11l.66-.65a5.56 5.56 0 017.71.19 5.63 5.63 0 010 7.92L12 21l-8.37-8.43a5.63 5.63 0 010-7.92 5.56 5.56 0 017.71-.19zm7.66 6.75a4.6 4.6 0 00-6.49-6.51L12 6.53l-1.17-1.18a4.6 4.6 0 10-6.49 6.51L12 19.58z"
                      fill="currentColor"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </span>
            </div>
          </div>
          <a
            href="/partner/jobListing.htm?pos=101&amp;ao=1131672&amp;s=149&amp;guid=000001756bc2a114bc220f15246b43c4&amp;src=GD_JOB_AD&amp;t=SRFJ&amp;vt=w&amp;uido=5B485F458EBD641B&amp;cs=1_96b751a7&amp;cb=1603830720282&amp;jobListingId=3360350142"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="jobInfoItem jobTitle css-jq9w1v css-13w0lq6 eigr9kq1 jobLink"
            style={{ pointerEvents: 'all' }}
          >
            <span>Software Engineer</span>
          </a>
          <div className="d-flex flex-wrap css-yytu5e e1rrn5ka1">
            <span className="loc css-nq3w9f pr-xxsm">Pittsburgh, PA</span>
          </div>
          <div className="jobFooter d-flex flex-wrap css-1tspwab e1rrn5ka0">
            <div className="salaryEstimate css-nq3w9f pr-xxsm">
              <span className="css-18034rf e1wijj242">
                $41K-$88K <span className="css-0 e1wijj240">(Glassdoor est.)</span>
                <span className="SVGInline greyInfoIcon">
                  <svg
                    className="SVGInline-svg greyInfoIcon-svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="prefix__info-16-px"
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path
                        d="M8 14A6 6 0 118 2a6 6 0 010 12zm0-1A5 5 0 108 3a5 5 0 000 10zm-.6-5.6a.6.6 0 111.2 0V11a.6.6 0 01-1.2 0V7.4zM8 5.6a.6.6 0 110-1.2.6.6 0 010 1.2z"
                        id="prefix__a"
                        fill="#505863"
                      ></path>
                    </g>
                  </svg>
                </span>
                <div className="hidden"></div>
              </span>
            </div>
            <div className="d-flex justify-content-between css-1fjcg6i">
              <div className="d-flex flex-wrap-reverse css-15ja3jn css-1qtdns2">
                <div className="mx-xxsm pr-std css-q9egvk" data-test="viewedDate">
                  Viewed on October 27
                </div>
              </div>
              <div data-test="job-age" className="d-flex align-items-end pl-std css-mi55ob">
                8d
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default JobResultCard;