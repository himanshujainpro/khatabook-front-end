import React, { useState, useEffect } from "react";
import CustomerService from '../services/CustomerService'
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom";

export default function HeaderComponent() {

    const [state, setstate] = useState("Login");
    const [url, setUrl] = useState("/login");
    let history = useHistory();


    useEffect(() => {
        {
            localStorage.getItem("uid") && CustomerService.getBName(localStorage.getItem("uid")).then(res => {
                setstate(res.data);
                setUrl("/book");
            });
        }
    }, []);

    const handleLogout = () => {
        setstate("Login");
        setUrl("/login");

        localStorage.clear();

        history.push('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container-fluid">
                <a className="navbar-brand p-2" href={url}><svg class="" height="24" width="113" viewBox="0 0 114 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.376 1.87841L16.5036 1.66208C16.5851 1.65394 16.6675 1.66251 16.7456 1.68726C16.8236 1.71201 16.8957 1.75238 16.9573 1.8059C17.0188 1.85942 17.0686 1.92492 17.1034 1.99831C17.1383 2.0717 17.1575 2.15142 17.1598 2.23246V21.8029C17.1837 21.9397 17.1715 22.0803 17.1244 22.211C17.0772 22.3418 16.9968 22.4583 16.8908 22.5493C16.7848 22.6403 16.6569 22.7027 16.5194 22.7304C16.3819 22.7582 16.2395 22.7503 16.1059 22.7077L14.4158 22.3733C14.4158 23.2387 14.4158 24.1238 13.4415 23.9861L0.656171 22.4126C0.479864 22.3748 0.320652 22.2816 0.20237 22.1469C0.0840886 22.0122 0.0130937 21.8432 0 21.6652V3.33391C0 2.80285 1.83701e-06 2.23247 0.576634 2.05545L13.2625 0.481942C13.4261 0.446727 13.5969 0.466235 13.7481 0.537435C13.8992 0.608635 14.0222 0.727488 14.0977 0.875312C14.376 1.09167 14.376 1.4457 14.376 1.87841ZM14.376 3.23556V20.6621L15.3901 20.7801C15.6088 20.7801 15.748 20.6621 15.748 20.4851V3.37325C15.7435 3.31737 15.719 3.26491 15.6789 3.22526C15.6388 3.18562 15.5858 3.16139 15.5293 3.1569C15.0322 3.19623 14.7339 3.23556 14.376 3.23556Z" fill="#C72028"></path><path d="M37.2344 4.86719V9.45001C37.5284 9.05127 37.9481 8.76064 38.4275 8.62393C38.8478 8.44491 39.3022 8.35769 39.7597 8.36823C40.2473 8.33888 40.7357 8.41323 41.1919 8.58626C41.648 8.7593 42.0614 9.027 42.4042 9.37135C43.0743 10.1855 43.4208 11.2136 43.3785 12.2627V19.4811H40.734V12.597C40.7461 12.3344 40.7048 12.0719 40.6126 11.8253C40.5204 11.5787 40.3791 11.3529 40.1971 11.1612C40.0542 10.9865 39.8717 10.8474 39.6645 10.7552C39.4573 10.6629 39.2311 10.6201 39.0041 10.6302C38.763 10.6235 38.5232 10.6674 38.3004 10.7589C38.0777 10.8504 37.877 10.9875 37.7116 11.1612C37.5332 11.3545 37.3956 11.581 37.3068 11.8275C37.2181 12.0741 37.1799 12.3357 37.1947 12.597V19.4811H34.5302V4.86719H37.2344ZM53.8176 12.2627V19.4811H51.2128V18.5567C50.8555 18.8743 50.4536 19.1393 50.0197 19.3434C49.5555 19.5388 49.0521 19.6262 48.5483 19.5991C47.6065 19.6533 46.678 19.3589 45.9436 18.773C45.2886 18.0745 44.9385 17.1487 44.9692 16.1964C44.9548 15.7538 45.0381 15.3133 45.2132 14.9057C45.3883 14.4981 45.6511 14.1331 45.9833 13.8361C46.806 13.238 47.806 12.9267 48.8267 12.9511H51.1332V12.0856C51.1701 11.8396 51.1482 11.5884 51.0693 11.3522C50.9904 11.116 50.8567 10.9014 50.6789 10.7255C50.5011 10.5496 50.2841 10.4174 50.0454 10.3393C49.8066 10.2613 49.5527 10.2396 49.3039 10.2761C49.1001 10.2736 48.8978 10.3124 48.7097 10.3902C48.5216 10.468 48.3517 10.5831 48.2103 10.7285C48.053 10.8245 47.9219 10.9572 47.8283 11.1149C47.7347 11.2726 47.6816 11.4506 47.6735 11.6332V11.7316H45.2874V11.6332C45.2648 11.1705 45.3519 10.709 45.5418 10.2855C45.7316 9.86198 46.019 9.4883 46.381 9.19431C47.272 8.55168 48.3626 8.23848 49.463 8.30922C50.5869 8.24753 51.6976 8.57433 52.6047 9.23366C53.0261 9.61431 53.3543 10.0849 53.5644 10.6097C53.7746 11.1345 53.8612 11.6998 53.8176 12.2627ZM51.173 15.5867V14.7409H49.1846C48.0711 14.7409 47.5144 15.2326 47.5144 16.0981C47.5144 16.9635 47.9916 17.4552 49.1449 17.4552C49.4196 17.4942 49.6995 17.4758 49.9666 17.4012C50.2337 17.3267 50.4821 17.1977 50.6958 17.0225C50.9662 16.5874 51.1297 16.0956 51.173 15.5867ZM58.9476 16.0981C58.9476 16.8455 59.3055 17.2782 60.0611 17.2782H60.8565V19.4811H59.6237C58.7518 19.4894 57.9057 19.1895 57.2376 18.6353C56.9257 18.3188 56.6821 17.9428 56.5214 17.5304C56.3608 17.1179 56.2865 16.6775 56.3031 16.2357V10.3351H54.7521V8.46658H56.3031V6.36203L58.9476 5.39825V8.46658H61.1149V10.3351H58.9476V16.0981ZM70.7189 12.2627V19.4811H68.1141V18.5567C67.7959 18.8855 67.4182 19.1524 67.0006 19.3434C66.5422 19.5352 66.0461 19.6225 65.549 19.5991C65.0718 19.6417 64.5908 19.5907 64.1335 19.4489C63.6763 19.3072 63.2519 19.0775 62.8846 18.773C62.2638 18.0581 61.9373 17.1384 61.97 16.1964C61.9514 15.7532 62.0327 15.3115 62.2081 14.9033C62.3835 14.495 62.6486 14.1305 62.984 13.8361C63.7544 13.2116 64.7336 12.8958 65.728 12.9511H68.1141V12.0856C68.153 11.8444 68.1347 11.5975 68.0605 11.3645C67.9863 11.1315 67.8583 10.9188 67.6866 10.7432C67.5149 10.5676 67.3042 10.434 67.0712 10.3529C66.8383 10.2719 66.5894 10.2456 66.3444 10.2761C65.9029 10.2708 65.4761 10.4326 65.1514 10.7285C64.8907 10.9612 64.7335 11.2864 64.7139 11.6332V11.7316H62.2682V11.6332C62.2626 11.171 62.3593 10.7131 62.5517 10.2917C62.7441 9.87036 63.0274 9.49579 63.3817 9.19431C64.2618 8.59067 65.3136 8.2806 66.3842 8.30922C67.5381 8.25479 68.6778 8.57985 69.6252 9.23366C70.0228 9.62697 70.3272 10.1027 70.5163 10.6265C70.7054 11.1503 70.7746 11.7092 70.7189 12.2627ZM68.1538 15.5867V14.7409H66.1654C65.0718 14.7409 64.535 15.2326 64.535 16.0981C64.535 16.9635 65.0718 17.4552 66.1654 17.4552C66.8813 17.4552 67.3585 17.4552 67.6369 17.0225C67.9734 16.6183 68.1563 16.1103 68.1538 15.5867ZM75.1529 19.5204H72.5283V4.90653H75.1927V9.58771C75.4775 9.20046 75.8515 8.88599 76.2838 8.67048C76.7161 8.45496 77.1941 8.3446 77.6782 8.34857C78.1898 8.32346 78.7005 8.41304 79.1722 8.61057C79.6439 8.80811 80.0644 9.10852 80.4023 9.48936C81.1549 10.4685 81.5223 11.6847 81.4363 12.9117V15.0949C81.5301 16.3046 81.161 17.5051 80.4023 18.4583C80.062 18.8174 79.6508 19.1036 79.1942 19.2992C78.7377 19.4949 78.2454 19.5958 77.7478 19.5958C77.2502 19.5958 76.7579 19.4949 76.3014 19.2992C75.8448 19.1036 75.4336 18.8174 75.0933 18.4583V19.5204H75.1529ZM78.7718 12.9511C78.8024 12.3325 78.6355 11.72 78.2946 11.2005C78.1363 11.018 77.9369 10.8749 77.7124 10.7826C77.4879 10.6904 77.2446 10.6516 77.0021 10.6695C76.7586 10.651 76.5144 10.6936 76.2919 10.7933C76.0695 10.893 75.8761 11.0466 75.7296 11.2399C75.3462 11.7267 75.1554 12.3351 75.1927 12.9511V15.0163C75.1488 15.627 75.3407 16.2315 75.7296 16.7078C75.8864 16.9149 76.0961 17.077 76.3373 17.1772C76.5785 17.2775 76.8423 17.3123 77.1016 17.2782C78.1952 17.2782 78.7718 16.4914 78.7718 15.0163V12.9511ZM82.848 15.0163V12.9511C82.7995 12.3242 82.8803 11.6942 83.0853 11.0991C83.2904 10.504 83.6156 9.95638 84.041 9.48936C84.9523 8.69049 86.1459 8.28042 87.3616 8.34857C87.9492 8.30665 88.5392 8.38644 89.0939 8.58287C89.6485 8.7793 90.1556 9.08806 90.5828 9.48936C91.4287 10.4412 91.8579 11.6863 91.7759 12.9511V15.0163C91.8239 15.6401 91.743 16.2671 91.5378 16.8589C91.3327 17.4507 91.0078 17.9949 90.5828 18.4583C90.1536 18.8566 89.6461 19.1635 89.092 19.3597C88.5379 19.5559 87.9489 19.6374 87.3616 19.5991C86.1459 19.6673 84.9523 19.2572 84.041 18.4583C83.6059 17.9936 83.2747 17.4434 83.0691 16.8435C82.8636 16.2436 82.7882 15.6076 82.848 14.9769V15.0163ZM89.1711 12.9511C89.1711 11.4169 88.5944 10.6695 87.4014 10.6695C86.2084 10.6695 85.413 11.4562 85.413 12.9511V15.0163C85.413 16.5308 86.0493 17.2782 87.4014 17.2782C88.7535 17.2782 89.1711 16.4914 89.1711 15.0163V12.9511ZM93.1479 15.0163V12.9511C93.0764 12.3227 93.1463 11.6865 93.3525 11.0881C93.5588 10.4896 93.8963 9.94366 94.3409 9.48936C95.2484 8.75091 96.387 8.34716 97.5621 8.34716C98.7372 8.34716 99.8758 8.75091 100.783 9.48936C101.225 9.94651 101.561 10.4923 101.771 11.0896C101.98 11.6869 102.057 12.3217 101.996 12.9511V15.0163C102.076 15.6197 102.017 16.2332 101.826 16.8115C101.634 17.3897 101.314 17.9181 100.888 18.3578C100.463 18.7974 99.9433 19.1372 99.3676 19.352C98.792 19.5668 98.175 19.6513 97.5621 19.5991C96.9498 19.6519 96.3334 19.5677 95.7585 19.3528C95.1836 19.1379 94.6649 18.7977 94.241 18.3576C93.8171 17.9175 93.4987 17.3886 93.3094 16.8102C93.1202 16.2318 93.065 15.6187 93.1479 15.0163ZM99.4709 12.9511C99.4709 11.4169 98.7551 10.6695 97.6018 10.6695C96.4486 10.6695 95.7129 11.4562 95.7129 12.9511V15.0163C95.7129 16.5308 96.3293 17.2782 97.6018 17.2782C98.8744 17.2782 99.4709 16.4914 99.4709 15.0163V12.9511ZM25.6024 15.4096V19.4811H22.8584V4.86719H25.6024V11.6332L29.7581 4.86719H32.8997L28.6048 10.9842L33.4366 19.4811H30.2353L27.0141 13.2264L25.6024 15.4096ZM106.331 16.2357V19.4811H103.686V4.86719H106.331V13.1281L109.572 8.52558H112.574L109.115 13.1281L113.091 19.4811H109.87L107.385 15.0556L106.331 16.2357Z" fill="#C72028"></path></svg>
                </a>

                {localStorage.getItem("uid") && <Dropdown className="d-flex">
                    <Dropdown.Toggle id="bNameHeader" variant="success">
                        {state}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>
                            LogOut
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown>}

            </div >
        </nav>
    )
}
