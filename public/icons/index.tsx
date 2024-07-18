import React, { forwardRef } from "react";

const size = 1.8;

export const FolderIcon = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref as React.ForwardedRef<any>}
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
  >
    <path
      d="M810.666667 85.333333a85.333333 85.333333 0 0 1 85.333333 85.333334v152.021333c36.821333 9.493333 64 42.88 64 82.645333v405.333334a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V298.666667a85.376 85.376 0 0 1 64-82.645334V170.666667a85.333333 85.333333 0 0 1 85.333333-85.333334h597.333334zM128.149333 296.170667L128 298.666667v512a64 64 0 0 0 60.245333 63.893333L192 874.666667h640a64 64 0 0 0 63.893333-60.245334L896 810.666667V405.333333a21.333333 21.333333 0 0 0-18.837333-21.184L874.666667 384H638.165333l-122.069333-101.717333a21.333333 21.333333 0 0 0-10.688-4.736l-2.986667-0.213334H149.333333a21.333333 21.333333 0 0 0-21.184 18.837334zM535.189333 213.333333l127.978667 106.666667H832V170.666667a21.333333 21.333333 0 0 0-18.837333-21.184L810.666667 149.333333H213.333333a21.333333 21.333333 0 0 0-21.184 18.837334L192 170.666667v42.666666h343.168z"
      fill="#000"
    ></path>
  </svg>
));
FolderIcon.displayName = "Folder";

export const ScriptIcon = forwardRef((props, ref) => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size + "rem"}
    height={size + "rem"}
  >
    <path
      d="M632 32H211.2C145.6 32 92.8 86.4 92.8 152v720c0 65.6 54.4 120 120 120h600c65.6 0 120-54.4 120-120V332.8L632 32zM435.2 672l-30.4 30.4-104-104 30.4-30.4 73.6-73.6 30.4 30.4-73.6 73.6 73.6 73.6z m56 92.8h-41.6l83.2-336h41.6l-83.2 336z m126.4-64L588.8 672l73.6-73.6-73.6-73.6 30.4-30.4 73.6 73.6 30.4 30.4-105.6 102.4z"
      fill="#515151"
    ></path>
    <path
      d="M632 32l300.8 300.8H752c-65.6 0-120-54.4-120-120V32z"
      fill="#666666"
    ></path>
  </svg>
));

export const CountTextIcon = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref as React.ForwardedRef<any>}
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size + "rem"}
    height={size + "rem"}
  >
    <path d="M0 113.777778h56.888889v796.444444H0z" fill="#505050"></path>
    <path
      d="M967.111111 113.777778h56.888889v512h-56.888889z"
      fill="#505050"
    ></path>
    <path d="M0 113.777778h1024v56.888889H0z" fill="#505050"></path>
    <path d="M0 853.333333h739.555556v56.888889H0z" fill="#505050"></path>
    <path
      d="M152.917333 625.777778h191.146667v-43.235556H278.755556V290.816h-39.822223a205.767111 205.767111 0 0 1-72.817777 25.486222v33.223111h60.074666v233.244445H152.917333z m240.298667 0h216.177778v-44.600889H525.653333c-16.384 0-37.319111 1.365333-54.613333 3.185778C542.037333 516.551111 593.464889 449.422222 593.464889 385.024A94.72 94.72 0 0 0 492.430222 284.444444a131.470222 131.470222 0 0 0-101.944889 50.062223l29.582223 29.127111a91.022222 91.022222 0 0 1 65.991111-37.319111 54.613333 54.613333 0 0 1 56.888889 61.44c0 55.068444-51.2 120.149333-149.731556 207.530666z m361.358222 5.688889a100.408889 100.408889 0 0 0 111.957334-96.028445 84.821333 84.821333 0 0 0-69.176889-83.740444V449.422222a80.952889 80.952889 0 0 0 57.799111-78.506666c0-55.523556-42.325333-86.471111-102.4-86.471112a141.141333 141.141333 0 0 0-96.028445 40.504889l27.306667 32.768a98.076444 98.076444 0 0 1 66.901333-31.857777 46.876444 46.876444 0 0 1 51.2 48.696888c0 33.678222-21.845333 58.709333-87.836444 58.709334v38.684444c75.548444 0 99.214222 24.120889 99.214222 61.44a56.263111 56.263111 0 0 1-63.715555 55.523556 108.088889 108.088889 0 0 1-78.961778-37.091556l-25.486222 34.133334a139.036444 139.036444 0 0 0 109.226666 45.511111z"
      fill="#505050"
    ></path>
    <path
      d="M739.555556 739.555556h284.444444v56.888888h-284.444444z"
      fill="#006ED2"
    ></path>
    <path
      d="M853.333333 625.777778h56.888889v284.444444h-56.888889z"
      fill="#006ED2"
    ></path>
  </svg>
));
CountTextIcon.displayName = "CountText";

export const JsonFormatIcon = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref as React.ForwardedRef<any>}
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size + "rem"}
    height={size + "rem"}
  >
    <path d="M212.992 526.336 212.992 526.336 212.992 526.336 215.04 526.336 212.992 526.336Z"></path>
    <path d="M546.816 407.552c-43.008 0-61.44 45.056-61.44 92.16 0 47.104 20.48 90.112 61.44 90.112 40.96 0 61.44-43.008 61.44-92.16C608.256 454.656 589.824 407.552 546.816 407.552z"></path>
    <path d="M784.384 196.608 239.616 196.608c-90.112 0-163.84 73.728-163.84 163.84l0 327.68c0 90.112 73.728 163.84 163.84 163.84l544.768 0c90.112 0 163.84-73.728 163.84-163.84l0-327.68C948.224 270.336 874.496 196.608 784.384 196.608zM249.856 538.624c0 61.44-28.672 79.872-69.632 79.872-10.24 0-22.528-2.048-30.72-4.096l4.096-28.672c6.144 2.048 14.336 4.096 22.528 4.096 22.528 0 36.864-10.24 36.864-51.2l0-155.648 34.816 0L247.808 538.624zM342.016 618.496c-22.528 0-45.056-6.144-55.296-14.336l8.192-28.672c12.288 8.192 30.72 14.336 51.2 14.336 28.672 0 43.008-14.336 43.008-34.816 0-20.48-12.288-32.768-38.912-43.008-34.816-14.336-57.344-34.816-57.344-67.584 0-36.864 28.672-65.536 75.776-65.536 22.528 0 38.912 6.144 49.152 10.24l-8.192 28.672c-8.192-4.096-22.528-10.24-40.96-10.24-28.672 0-38.912 16.384-38.912 30.72 0 20.48 12.288 28.672 43.008 43.008 36.864 16.384 55.296 36.864 55.296 69.632C423.936 589.824 395.264 618.496 342.016 618.496zM546.816 618.496c-59.392 0-98.304-47.104-98.304-118.784 0-73.728 40.96-120.832 100.352-120.832 61.44 0 96.256 51.2 96.256 118.784C645.12 577.536 602.112 618.496 546.816 618.496zM849.92 616.448l-34.816 0-61.44-108.544c-14.336-24.576-28.672-53.248-38.912-77.824l-2.048 0c2.048 28.672 2.048 59.392 2.048 100.352l0 88.064-32.768 0L681.984 382.976l38.912 0 61.44 108.544c14.336 24.576 28.672 53.248 36.864 77.824l0 0c-2.048-30.72-4.096-61.44-4.096-98.304l0-86.016 32.768 0L847.872 616.448z"></path>
  </svg>
));
JsonFormatIcon.displayName = "JsonFormat";

export const ColorTransIcon = forwardRef((props, ref) => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size + "rem"}
    height={size + "rem"}
  >
    <path
      d="M294.93577 432.109107c-0.063218-3.108504-2.162045-5.321123-3.55464-7.802868-15.515425-27.647801-26.152252-57.03138-30.861066-88.399993-8.622892-57.457647 0.531029-112.142748 28.442538-163.022144 36.9697-67.386436 92.960697-111.631588 167.646066-130.26816 130.795576-32.634773 263.299836 37.506147 309.763025 164.055301 27.096904 73.803933 20.885316 145.864865-16.362542 215.169506-1.607535 2.989293-3.25842 5.956912-5.160369 9.430272 15.020521 1.903755 29.634643 4.186817 43.735798 8.62831 97.870002 30.819523 161.477826 95.198603 184.53783 195.507001 18.811776 81.836191-0.317895 156.794299-53.093821 222.063846-40.726636 50.368236-93.768077 81.798261-157.874418 92.187635-94.008304 15.237267-173.42958-13.667663-238.538373-82.676083-2.935107-3.113922-4.091087-3.337894-7.083993-0.05238C475.577585 911.887958 425.375521 941.04034 365.179645 950.188842c-89.068294 13.534002-166.291401-12.089027-230.038305-75.863024-39.048659-39.061302-63.033447-86.617254-71.233683-141.192175-12.470139-83.013847 9.354411-156.463761 66.011903-218.680797 38.066075-41.801337 85.589515-67.727811 140.915824-79.209948 7.936528-1.647272 15.907375-3.677463 24.163604-3.17714 3.231327 0.025287 4.073025 2.842989 5.395178 4.874986 11.791001 18.1218 25.207599 34.919641 41.051756 49.656585 20.659538 19.214563 43.676193 34.961184 69.413014 46.73051 23.973951 10.96014 48.977447 18.125412 75.075512 21.638509 2.272224 0.305251 4.869568 0.025287 6.711912 1.997679 0.361244 2.407691-0.935622 4.311446-2.026578 6.204364-16.658762 28.921186-27.626127 59.872563-32.253661 92.904704-2.481746 17.747912-3.269257 35.587942-1.818863 53.617625 2.212619 27.530397 8.315834 54.000543 18.867769 79.437532 10.35325 24.951116 24.47608 47.660713 41.720057 68.471974 2.443815 2.949556 3.655788 2.45104 5.770871-0.059605 10.714494-12.721204 20.049036-26.374417 28.261916-40.824172 15.724947-27.662251 25.716953-57.266188 30.395061-88.708856 6.424723-43.183095 1.457619-85.121705-13.73088-125.942264-5.015871-13.485235-11.21301-26.41596-18.33674-38.911386-1.085538-1.898337-2.404078-3.789448-2.033803-6.197139 2.521482-2.189138 5.767259-1.914593 8.725846-2.326411 49.519313-6.934077 93.370709-26.652574 131.733004-58.568472 20.240495-16.837578 37.217152-36.630131 51.450161-58.772575 2.926076-4.551673 2.821315-4.692558-2.34086-5.572187-21.54278-3.672044-42.935643-1.540705-64.189427 2.111471-45.861718 7.878729-86.357159 27.479823-122.096823 57.080147-8.817963 7.302545-17.061549 15.251717-24.851774 23.663281-0.87421 0.823636-1.515418 1.849569-2.357116 2.700298-2.590119 2.6136-4.918336 2.416722-7.374794-0.343182-15.882088-17.847255-33.960538-33.154964-54.087242-45.986348-33.203732-21.167086-69.234198-34.54756-108.477928-39.075752-17.189791-1.985035-34.327201-2.973037-51.502542-0.016256C299.747538 432.253605 297.329011 432.204837 294.93577 432.109107z"
      fill="#272635"
    ></path>
    <path
      d="M522.710881 522.089542c8.259842 10.692819 16.599157 21.327839 23.921571 32.701603 0.79293 2.102439-0.36305 2.573863-2.158432 2.873695-16.283068 2.740035-32.551687 2.687655-48.834756-0.007225-1.784545-0.294414-2.971231-0.749581-2.171076-2.862858 7.44343-11.299709 15.553356-22.095483 24.038975-32.638386C519.746875 519.369375 520.944399 519.898598 522.710881 522.089542z"
      fill="#272635"
    ></path>
  </svg>
));
ColorTransIcon.displayName = "ColorTrans";

export const Md5Icon = forwardRef((props, ref) => (
  <svg
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={size + "rem"}
    height={size + "rem"}
  >
    <path d="M561.773714 0a290.742857 290.742857 0 0 1 257.974857 167.936l5.12 11.702857-101.302857 41.910857c-27.501714-66.56-91.867429-110.445714-160.694857-111.908571a191.195429 191.195429 0 0 0-183.296 189.001143v21.869714h433.883429c72.118857 0 131.291429 55.734857 136.777143 126.537143l0.365714 10.678857v365.129143c0 72.118857-55.661714 131.218286-126.390857 136.777143l-10.752 0.365714h-603.428572a137.142857 137.142857 0 0 1-136.777143-126.464L72.886857 822.857143V457.728c0-72.118857 55.661714-131.291429 126.390857-136.777143l10.752-0.365714 59.977143-0.073143v-9.289143C264.082286 145.773714 393.106286 6.582857 561.846857 0zM511.744 492.032a111.396571 111.396571 0 0 0-46.006857 212.845714l9.142857 3.657143v77.750857h73.654857V708.608A111.469714 111.469714 0 0 0 511.744 492.032z"></path>
  </svg>
));
Md5Icon.displayName = "Md5";
