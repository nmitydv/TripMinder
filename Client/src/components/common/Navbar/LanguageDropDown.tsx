// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaLanguage } from 'react-icons/fa6';

// const LanguageDropdown = () => {

//     const [selectedLanguage, setSelectedLanguage] = useState(
//         localStorage.getItem('language')
//     );
//     const [t, i18n] = useTranslation('global');

//     const handleLanguageChange = (event: { target: { value: any } }) => {
//         localStorage.setItem('language', event.target.value);
//         setSelectedLanguage(event.target.value);
//     };

//     useEffect(() => {
//         i18n.changeLanguage(selectedLanguage);
//     }, [selectedLanguage]);

//     return (
//         <div className="select_language d-flex justify-content-left align-items-left ">
//             <label htmlFor="language">
//                 {''}
//                 <FaLanguage size={27} className="language_icon" />
//                 Select Language : &nbsp;{' '}
//             </label>
//             <select
//                 id="language"
//                 value={selectedLanguage}
//                 onChange={handleLanguageChange}
//             >
//                 <option value="en">English</option>
//                 <option value="hi">Hindi</option>
//             </select>
//         </div>

//     );
// };

// export default LanguageDropdown;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Form, SelectPicker, Toggle } from 'rsuite';
import { FaLanguage } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';

const LanguageDropdown = () => {
    const location = useLocation().pathname;
    const [toggle, setToggle] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(
        localStorage.getItem('language') || 'en'
    );
    const [t, i18n] = useTranslation('global');

    const data = [
        { label: 'English', value: 'en' },
        { label: 'Hindi', value: 'hi' },
    ];

    const handleLanguageChange = (e) => {
        e.preventDefault();
        
        localStorage.setItem('language', selectedLanguage === "hi" ? "en" : "hi");
        setSelectedLanguage(selectedLanguage === "hi" ? "en" : "hi");
    };
    console.log(selectedLanguage);

    useEffect(() => {
        i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);

    return (
        // <div className="select_language d-flex justify-content-left align-items-left w">
        //   <label htmlFor="language" >
        //     <FaLanguage size={27} className="language_icon" />
        //     {/* Language: &nbsp; */}

        //   </label>
        //   <Dropdown
        //     id="language"
        //     title={`Selected: ${dropdownItems.find((item) => item.value === selectedLanguage)?.label}`}
        //     onSelect={handleLanguageChange}

        //   >

        //    {dropdownItems.map((item) => (
        //       <Dropdown.Item key={item.value} eventKey={item.value}>
        //         {item.label}
        //       </Dropdown.Item>
        //     ))}

        //   </Dropdown>
        // </div>

        <div className="select_language d-flex justify-content-left align-items-left w">
            {location !== '/' ? (
                <label htmlFor="language">
                    {/* <FaLanguage size={27} className="language_icon" /> */}
                </label>
            ) : (
                ''
            )}
            {/* <SelectPicker
                id="language"
                label="Select Language"
                data={data}
                value={selectedLanguage}
                onChange={handleLanguageChange}
                style={{ width: 224 }}
            /> */}
            {/* <select
                name="language"
                // id=""
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="form-control"
                style={{ width: location === '/' ? '150px' : '' }}
            >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
            </select> */}
            {/* <Toggle defaultChecked={selectedLanguage === "en"} onChange={e=>handleLanguageChange(e)} checkedChildren="English" unCheckedChildren="Hindi" /> */}
            {/* <form> */}
              <span onClick={handleLanguageChange}>

                <Toggle checked={selectedLanguage === "en"}  size="lg" checkedChildren="English" unCheckedChildren={t("languagedropdown.hindi")} />
              </span>
        
            {/* </form> */}
            {/* <Toggle checked={selectedLanguage == "en"} onChange={e=>handleLanguageChange(e)} checkedChildren={<p>Hindi</p>} unCheckedChildren={<p>English</p>} /> */}
        </div>
    );
};

export default LanguageDropdown;
