import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";
import countdownSound from "./countdown-sound.mp3";
import { FaTemperatureHigh, FaMoon, FaSun, FaQuran, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaClock, FaCloudSun, FaCloudMoon, FaGift, FaPray, FaHandsHelping } from "react-icons/fa";
const translations = {
  en: {
    title: "Countdown to",
    titleTime: "Time!",
    hours: "Hours",
    hour: "Hour",
    minutes: "Minutes",
    minute: "Minute",
    seconds: "Seconds",
    second: "Second",
    ramadanDay: "Today is Ramadan Day:",
    currentTime: "Current Time:",
    imsakLabel: "Imsak:",
    iftarLabel: "Iftar:",
    stayStrong: "Stay strong!",
    comingSoon: "is coming soon.",
    itsTime: "It's time for",
    imsak: "Imsak",
    iftar: "Iftar",
    imsakMessage: "It's time to start fasting. Stop eating and drinking now.",
    iftarMessage: "Enjoy your meal and prayers.",
    imsakCountdown: "Prepare for Suhoor! Imsak",
    iftarCountdown: "Stay strong! Iftar",
    footer: "Designed withfor Ramadan 2025 by Youssef Fawel",
    notStarted: "Ramadan hasn't started yet this year.",
    dailyDua: "Dua of the Day",
    location: "Location: Tunisia",
    locationNote: "Please verify times for your specific location",
    inspirationalQuote: "The month of Ramadan is the one in which the Quran was revealed as guidance for mankind.",
    todaysFastingTip: "Today's Fasting Tip",
    fastingTips: [
      "Stay hydrated during non-fasting hours",
      "Eat a balanced suhoor meal with protein and complex carbs",
      "Break your fast with dates and water",
      "Avoid overeating during iftar",
      "Maintain regular prayer times",
      "Get adequate rest between taraweeh and suhoor"
    ],
    duas: [
      "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      "O Allah, I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
      "اللهم اجعل صيامي فيه صيام الصائمين و قيامي فيه قيام القائمين",
      "O Allah, make my fast the fast of those who fast sincerely and my standing in prayer the standing of those who stand in devotion"
    ],
    weatherInfo: "Weather: 24°C, Clear Sky",
    darkMode: "Toggle Dark Mode",
    eidMubarak: "Eid Mubarak!",
    eidMessage: "May Allah accept your fasts, prayers, and good deeds.",
    eidTitle: "Happy Eid al-Fitr!",
    eidDescription: "Celebrating the end of Ramadan with joy and gratitude.",
    eidTips: "Eid Traditions",
    eidTipsList: [
      "Perform Eid prayer in the morning",
      "Give Zakat al-Fitr before Eid prayer",
      "Wear your best clothes",
      "Exchange greetings with family and friends",
      "Share food and gifts with others",
      "Visit relatives and neighbors"
    ],
    eidDuas: [
      "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
      "May Allah accept (good deeds) from us and from you",
      "اللَّهُمَّ أَعِدْهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      "O Allah, bring it back to us with prosperity, faith, safety, and Islam"
    ],
    eidActivities: "Eid Activities",
    eidActivitiesList: [
      "Attend Eid prayer",
      "Visit family and friends",
      "Give gifts to children",
      "Prepare special meals",
      "Donate to charity",
      "Call distant relatives"
    ]
  },
  ar: {
    title: "العد التنازلي إلى",
    titleTime: "حان الوقت!",
    hours: "ساعات",
    hour: "ساعة",
    minutes: "دقائق",
    minute: "دقيقة",
    seconds: "ثواني",
    second: "ثانية",
    ramadanDay: "اليوم هو يوم رمضان:",
    currentTime: "الوقت الحالي:",
    imsakLabel: "الإمساك:",
    iftarLabel: "الإفطار:",
    stayStrong: "كن قوياً!",
    comingSoon: "قادم قريباً.",
    itsTime: "حان وقت",
    imsak: "الإمساك",
    iftar: "الإفطار",
    imsakMessage: "حان وقت بدء الصيام. توقف عن الأكل والشرب الآن.",
    iftarMessage: "استمتع بوجبتك وصلاتك.",
    imsakCountdown: "استعد للسحور! الإمساك",
    iftarCountdown: "كن قوياً! الإفطار",
    footer: "صُمم بكللرمضان 2025 من تصميم يوسف فوال",
    notStarted: "لم يبدأ رمضان بعد هذا العام.",
    dailyDua: "دعاء اليوم",
    location: "الموقع: تونس",
    locationNote: "يرجى التحقق من الأوقات لموقعك المحدد",
    inspirationalQuote: "شهر رمضان الذي أنزل فيه القرآن هدى للناس.",
    todaysFastingTip: "نصيحة الصيام اليوم",
    fastingTips: [
      "حافظ على الترطيب خلال ساعات الإفطار",
      "تناول وجبة سحور متوازنة مع البروتين والكربوهيدرات المعقدة",
      "افطر على التمر والماء",
      "تجنب الإفراط في الأكل خلال الإفطار",
      "حافظ على أوقات الصلاة المنتظمة",
      "احصل على قسط كافٍ من الراحة بين التراويح والسحور"
    ],
    duas: [
      "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      "اللهم إني صمت لك وبك آمنت وعليك توكلت وعلى رزقك أفطرت",
      "اللهم اجعل صيامي فيه صيام الصائمين و قيامي فيه قيام القائمين",
      "اللهم اجعل صيامي صيام المخلصين وقيامي قيام المتعبدين"
    ],
    weatherInfo: "الطقس: 24 درجة مئوية، سماء صافية",
    darkMode: "تبديل الوضع المظلم",
    eidMubarak: "عيد مبارك!",
    eidMessage: "تقبل الله منا ومنكم صالح الأعمال",
    eidTitle: "عيد الفطر السعيد!",
    eidDescription: "نحتفل بنهاية شهر رمضان بفرح وامتنان",
    eidTips: "تقاليد العيد",
    eidTipsList: [
      "أداء صلاة العيد في الصباح",
      "إخراج زكاة الفطر قبل صلاة العيد",
      "ارتداء أفضل الملابس",
      "تبادل التهاني مع العائلة والأصدقاء",
      "مشاركة الطعام والهدايا مع الآخرين",
      "زيارة الأقارب والجيران"
    ],
    eidDuas: [
      "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
      "تقبل الله منا ومنكم",
      "اللَّهُمَّ أَعِدْهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      "اللهم أعده علينا باليمن والإيمان والسلامة والإسلام"
    ],
    eidActivities: "أنشطة العيد",
    eidActivitiesList: [
      "حضور صلاة العيد",
      "زيارة العائلة والأصدقاء",
      "تقديم الهدايا للأطفال",
      "إعداد وجبات خاصة",
      "التبرع للجمعيات الخيرية",
      "الاتصال بالأقارب البعيدين"
    ]
  }
};
 const getRamadanDay = () => {
  const startRamadan = new Date("2025-03-01");
  const endRamadan = new Date("2025-04-01");
  const today = new Date();
  
  if (today < startRamadan) {
    return "Ramadan hasn't started yet this year.";
  }
  
  if (today > endRamadan) {
    const eidEndDate = new Date("2025-04-03");
    if (today <= eidEndDate) {
      return "Eid al-Fitr";
    }
    return "Ramadan has ended for this year.";
  }
  
  const diffTime = today - startRamadan;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
const getEventTimes = () => {
  const now = new Date();
  
  const imsakTime = new Date();
  imsakTime.setHours(4, 33, 0, 0);
  if (now.getHours() > 4 || (now.getHours() === 4 && now.getMinutes() >= 33 )) {
    imsakTime.setDate(imsakTime.getDate() + 1);
  }
  
  const iftarTime = new Date();
  iftarTime.setHours(18, 47, 0, 0);
  if (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() >= 47)) {
    iftarTime.setDate(iftarTime.getDate() + 1);
  }
  
  return {
    imsakTime,
    iftarTime,
    imsakTimeString: imsakTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    iftarTimeString: iftarTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  };
};
const isEid = () => {
  const today = new Date();
  const endRamadan = new Date("2025-04-01");
  const eidEndDate = new Date("2025-04-03");
  
  return today > endRamadan && today <= eidEndDate;
};
const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ramadanDay, setRamadanDay] = useState(getRamadanDay());
  const [language, setLanguage] = useState("en");
  
  const [targetEvent, setTargetEvent] = useState("iftar");
  const [targetTime, setTargetTime] = useState(null);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [totalSeconds, setTotalSeconds] = useState(0);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTimeReached, setIsTimeReached] = useState(false);
  const [celebrationEvent, setCelebrationEvent] = useState(null);
  
  const [darkMode, setDarkMode] = useState(false);
  const [dailyDuaIndex, setDailyDuaIndex] = useState(0);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);
  const [showQuranPopup, setShowQuranPopup] = useState(false);
  
  const [eidMode, setEidMode] = useState(isEid());
  const [showEidMessage, setShowEidMessage] = useState(false);
  
  const audioRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const timerRef = useRef(null);
  const forceUpdateRef = useRef(false);
  
 useEffect(() => {
  const ramadanStatus = getRamadanDay();
  const isEidPeriod = isEid();
  
  setEidMode(isEidPeriod || ramadanStatus === "Eid al-Fitr");
  
  if ((isEidPeriod || ramadanStatus === "Eid al-Fitr") && !showEidMessage) {
    setShowConfetti(true);
    setShowEidMessage(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 200000); 
  }
}, [currentTime, showEidMessage]);
  useEffect(() => {
    const updateEventTimes = () => {
      const { imsakTime, iftarTime } = getEventTimes();
      const now = new Date();
      
      let nextEvent, nextTime;
      const timeToImsak = imsakTime - now;
      const timeToIftar = iftarTime - now;
      
      if ((timeToImsak < timeToIftar && timeToImsak > 0) && !forceUpdateRef.current) {
        nextEvent = "imsak";
        nextTime = imsakTime;
      } else {
        nextEvent = "iftar";
        nextTime = iftarTime;
      }
      
      forceUpdateRef.current = false;
      
      setTargetEvent(nextEvent);
      setTargetTime(nextTime);
      
      console.log(`Target event set to: ${nextEvent} at ${nextTime}`);
    };
    
    updateEventTimes();
    
    const eventTimer = setInterval(updateEventTimes, 3600000);
    
    return () => clearInterval(eventTimer);
  }, []);
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
      setRamadanDay(getRamadanDay());
    }, 1000);
    
    return () => clearInterval(clockTimer);
  }, []);
  useEffect(() => {
    const day = new Date().getDate();
    setDailyDuaIndex(day % translations[language].duas.length);
    setDailyTipIndex(day % translations[language].fastingTips.length);
  }, [language, currentTime]);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  useEffect(() => {
    if (!targetTime) return;
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetTime - now;
      const totalSecs = Math.floor(difference / 1000);
      
      setTotalSeconds(totalSecs);
      setHours(String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"));
      setMinutes(String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"));
      setSeconds(String(Math.floor((difference / 1000) % 60)).padStart(2, "0"));
      
      if (totalSecs <= 60 && totalSecs > 0) {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        document.body.classList.add('final-countdown');
      } else {
        document.body.classList.remove('final-countdown');
        if (audioRef.current && audioRef.current.played.length > 0) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
      
      if (totalSecs <= 0 && !isTimeReached) {
        setShowConfetti(true);
        setIsTimeReached(true);
        setCelebrationEvent(targetEvent);
        document.body.classList.add('time-reached');
        
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        
        if (celebrationTimerRef.current) {
          clearTimeout(celebrationTimerRef.current);
        }
        
        celebrationTimerRef.current = setTimeout(() => {
          setIsTimeReached(false);
          setShowConfetti(false);
          document.body.classList.remove('time-reached');
          
          forceUpdateRef.current = true;
          const nextEvent = targetEvent === "imsak" ? "iftar" : "imsak";
          console.log(`Celebration ended. Switching from ${targetEvent} to ${nextEvent}`);
          
          const { imsakTime, iftarTime } = getEventTimes();
          if (nextEvent === "imsak") {
            setTargetEvent("imsak");
            setTargetTime(imsakTime);
          } else {
            setTargetEvent("iftar");
            setTargetTime(iftarTime);
          }
        }, 120000);
      }
    };
    
    updateCountdown();
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(updateCountdown, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [targetTime, isTimeReached, targetEvent]);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (celebrationTimerRef.current) clearTimeout(celebrationTimerRef.current);
      document.body.classList.remove('final-countdown', 'time-reached', 'dark-mode');
    };
  }, []);
  const { imsakTimeString, iftarTimeString } = getEventTimes();
  const isFlashing = totalSeconds <= 60 && totalSeconds > 0;
  const t = translations[language];
  const currentTimeString = currentTime.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit", 
    hour12: true 
  });
  
  const hoursNum = parseInt(hours, 10);
  const minutesNum = parseInt(minutes, 10);
  const secondsNum = parseInt(seconds, 10);
  if (eidMode) {
    return (
      <div className={`container eid-mode ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={500} />}
        
        <div className="app-controls">
          <button 
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={t.darkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <button 
            className="language-button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </div>
        
        <div className="eid-header">
          <h1 className="eid-title">{t.eidMubarak}</h1>
          <p className="eid-subtitle">{t.eidMessage}</p>
        </div>
        
        <div className="highlight-box eid-highlight">
          <p><FaCalendarAlt className="icon" /> {t.eidTitle}</p>
          <p><FaClock className="icon" /> {t.currentTime} {currentTimeString}</p>
          <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
        </div>
        
        <div className="eid-cards">
          <div className="card eid-card">
            <h3><FaPray className="icon" /> {t.eidDuas[0]}</h3>
            <p className="dua-text">{t.eidDuas[1]}</p>
            <p className="dua-text arabic-text">{t.eidDuas[2]}</p>
            <p className="dua-text">{t.eidDuas[3]}</p>
          </div>
        </div>
        
        <div className="feature-cards">
          <div className="card eid-tips-card">
            <h3><FaGift className="icon" /> {t.eidTips}</h3>
            <ul className="eid-list">
              {t.eidTipsList.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="card eid-activities-card">
            <h3><FaHandsHelping className="icon" /> {t.eidActivities}</h3>
            <ul className="eid-list">
              {t.eidActivitiesList.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="quote-box eid-quote">
          <p className="quote">{t.eidDescription}</p>
        </div>
        
        <div className="action-buttons">
          <button 
            className="action-button"
            onClick={() => setShowQuranPopup(true)}
          >
            <FaQuran className="icon" /> Quran Verse
          </button>
          
          <button 
            className="action-button info-button"
            onClick={() => window.open("https://islamqa.info/en/categories/very-important/eid", "_blank")}
          >
            <FaInfoCircle className="icon" /> Eid Guide
          </button>
        </div>
        
        {showQuranPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button" onClick={() => setShowQuranPopup(false)}>×</button>
              <h2>Quran Verse for Eid</h2>
              <p className="arabic-text">
                وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ
              </p>
              <p>
                "And [wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful." (Al-Baqarah 2:185)
              </p>
            </div>
          </div>
        )}
        
        <footer className="footer">
          {t.footer}
        </footer>
      </div>
    );
  }
  // Regular Ramadan mode UI
  return (
    <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className="app-controls">
        <button 
          className="icon-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={t.darkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <button 
          className="language-button"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div>
      
      <h1 className="title">
        {isTimeReached ? `${t[celebrationEvent]} ${t.titleTime}` : `${t.title} ${t[targetEvent]}`}
      </h1>
      <div className="countdown-container">
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : hours}
          <span className="label">{hoursNum === 1 ? t.hour : t.hours}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : minutes}
          <span className="label">{minutesNum === 1 ? t.minute : t.minutes}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : seconds}
          <span className="label">{secondsNum === 1 ? t.second : t.seconds}</span>
        </div>
      </div>
      
      <div className={`location-note-highlight ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <FaInfoCircle className="note-highlight-icon" />
        <span className="note-highlight-text">{t.locationNote}</span>
      </div>
      
      <div className="highlight-box">
        <p><FaCalendarAlt className="icon" /> {t.ramadanDay} {ramadanDay}</p>
        <p><FaClock className="icon" /> {t.currentTime} {currentTimeString}</p>
        <p className="prayer-times">
          <span><FaCloudSun className="icon" /> {t.imsakLabel} {imsakTimeString}</span>
          <span><FaCloudMoon className="icon" /> {t.iftarLabel} {iftarTimeString}</span>
        </p>
        <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
      </div>
      
      <p className="message">
        {isTimeReached 
          ? (celebrationEvent === "imsak" ? t.imsakMessage : t.iftarMessage)
          : `${targetEvent === "imsak" ? t.imsakCountdown : t.iftarCountdown} ${t.comingSoon}`}
      </p>
      
      <div className="feature-cards">
        <div className="card dua-card">
          <h3><FaQuran className="icon" /> {t.dailyDua}</h3>
          <p className="dua-text">{t.duas[dailyDuaIndex]}</p>
        </div>
        
        <div className="card tip-card">
          <h3><FaInfoCircle className="icon" style={{ marginRight: '8px' }} /> {t.todaysFastingTip}</h3>
          <p>{t.fastingTips[dailyTipIndex]}</p>
        </div>
      </div>
      
      <div className="quote-box">
        <p className="quote">{t.inspirationalQuote}</p>
      </div>
      
      <div className="weather-info">
        <p><FaTemperatureHigh className="icon" style={{ marginRight: '5px' }} /> {t.weatherInfo}</p>
      </div>
      
      {showQuranPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={() => setShowQuranPopup(false)}>×</button>
            <h2>Quran Verse of the Day</h2>
                      <p className="arabic-text">
              شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ
            </p>
            <p>
              "The month of Ramadan is that in which was revealed the Quran, a guidance for mankind and clear proofs for guidance and criterion." (Al-Baqarah 2:185)
            </p>
          </div>
        </div>
      )}
      <div className="action-buttons">
        <button 
          className="action-button"
          onClick={() => setShowQuranPopup(true)}
        >
          <FaQuran className="icon" /> Quran Verse
        </button>
        
        <button 
          className="action-button info-button"
          onClick={() => window.open("https://islamqa.info/en/categories/very-important/ramadan", "_blank")}
        >
          <FaInfoCircle className="icon" /> Ramadan Guide
        </button>
      </div>
      <audio ref={audioRef} src={countdownSound} loop />
      <footer className="footer">
        {t.footer}
      </footer>
    </div>
  );
};
export default App;
import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";
import countdownSound from "./countdown-sound.mp3";
import { FaTemperatureHigh, FaMoon, FaSun, FaQuran, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaClock, FaCloudSun, FaCloudMoon, FaGift, FaPray, FaHandsHelping } from "react-icons/fa";
const translations = {
  en: {
    title: "Countdown to",
    titleTime: "Time!",
    hours: "Hours",
    hour: "Hour",
    minutes: "Minutes",
    minute: "Minute",
    seconds: "Seconds",
    second: "Second",
    ramadanDay: "Today is Ramadan Day:",
    currentTime: "Current Time:",
    imsakLabel: "Imsak:",
    iftarLabel: "Iftar:",
    stayStrong: "Stay strong!",
    comingSoon: "is coming soon.",
    itsTime: "It's time for",
    imsak: "Imsak",
    iftar: "Iftar",
    imsakMessage: "It's time to start fasting. Stop eating and drinking now.",
    iftarMessage: "Enjoy your meal and prayers.",
    imsakCountdown: "Prepare for Suhoor! Imsak",
    iftarCountdown: "Stay strong! Iftar",
    footer: "Designed withfor Ramadan 2025 by Youssef Fawel",
    notStarted: "Ramadan hasn't started yet this year.",
    dailyDua: "Dua of the Day",
    location: "Location: Tunisia",
    locationNote: "Please verify times for your specific location",
    inspirationalQuote: "The month of Ramadan is the one in which the Quran was revealed as guidance for mankind.",
    todaysFastingTip: "Today's Fasting Tip",
    fastingTips: [
      "Stay hydrated during non-fasting hours",
      "Eat a balanced suhoor meal with protein and complex carbs",
      "Break your fast with dates and water",
      "Avoid overeating during iftar",
      "Maintain regular prayer times",
      "Get adequate rest between taraweeh and suhoor"
    ],
    duas: [
      "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      "O Allah, I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
      "اللهم اجعل صيامي فيه صيام الصائمين و قيامي فيه قيام القائمين",
      "O Allah, make my fast the fast of those who fast sincerely and my standing in prayer the standing of those who stand in devotion"
    ],
    weatherInfo: "Weather: 24°C, Clear Sky",
    darkMode: "Toggle Dark Mode",
    eidMubarak: "Eid Mubarak!",
    eidMessage: "May Allah accept your fasts, prayers, and good deeds.",
    eidTitle: "Happy Eid al-Fitr!",
    eidDescription: "Celebrating the end of Ramadan with joy and gratitude.",
    eidTips: "Eid Traditions",
    eidTipsList: [
      "Perform Eid prayer in the morning",
      "Give Zakat al-Fitr before Eid prayer",
      "Wear your best clothes",
      "Exchange greetings with family and friends",
      "Share food and gifts with others",
      "Visit relatives and neighbors"
    ],
    eidDuas: [
      "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
      "May Allah accept (good deeds) from us and from you",
      "اللَّهُمَّ أَعِدْهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      "O Allah, bring it back to us with prosperity, faith, safety, and Islam"
    ],
    eidActivities: "Eid Activities",
    eidActivitiesList: [
      "Attend Eid prayer",
      "Visit family and friends",
      "Give gifts to children",
      "Prepare special meals",
      "Donate to charity",
      "Call distant relatives"
    ]
  },
  ar: {
    title: "العد التنازلي إلى",
    titleTime: "حان الوقت!",
    hours: "ساعات",
    hour: "ساعة",
    minutes: "دقائق",
    minute: "دقيقة",
    seconds: "ثواني",
    second: "ثانية",
    ramadanDay: "اليوم هو يوم رمضان:",
    currentTime: "الوقت الحالي:",
    imsakLabel: "الإمساك:",
    iftarLabel: "الإفطار:",
    stayStrong: "كن قوياً!",
    comingSoon: "قادم قريباً.",
    itsTime: "حان وقت",
    imsak: "الإمساك",
    iftar: "الإفطار",
    imsakMessage: "حان وقت بدء الصيام. توقف عن الأكل والشرب الآن.",
    iftarMessage: "استمتع بوجبتك وصلاتك.",
    imsakCountdown: "استعد للسحور! الإمساك",
    iftarCountdown: "كن قوياً! الإفطار",
    footer: "صُمم بكللرمضان 2025 من تصميم يوسف فوال",
    notStarted: "لم يبدأ رمضان بعد هذا العام.",
    dailyDua: "دعاء اليوم",
    location: "الموقع: تونس",
    locationNote: "يرجى التحقق من الأوقات لموقعك المحدد",
    inspirationalQuote: "شهر رمضان الذي أنزل فيه القرآن هدى للناس.",
    todaysFastingTip: "نصيحة الصيام اليوم",
    fastingTips: [
      "حافظ على الترطيب خلال ساعات الإفطار",
      "تناول وجبة سحور متوازنة مع البروتين والكربوهيدرات المعقدة",
      "افطر على التمر والماء",
      "تجنب الإفراط في الأكل خلال الإفطار",
      "حافظ على أوقات الصلاة المنتظمة",
      "احصل على قسط كافٍ من الراحة بين التراويح والسحور"
    ],
    duas: [
      "اللَّهُمَّ إِنِّي لَكَ صُمْتُ، وَبِكَ آمَنْتُ، وَعَلَيْكَ تَوَكَّلْتُ، وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      "اللهم إني صمت لك وبك آمنت وعليك توكلت وعلى رزقك أفطرت",
      "اللهم اجعل صيامي فيه صيام الصائمين و قيامي فيه قيام القائمين",
      "اللهم اجعل صيامي صيام المخلصين وقيامي قيام المتعبدين"
    ],
    weatherInfo: "الطقس: 24 درجة مئوية، سماء صافية",
    darkMode: "تبديل الوضع المظلم",
    eidMubarak: "عيد مبارك!",
    eidMessage: "تقبل الله منا ومنكم صالح الأعمال",
    eidTitle: "عيد الفطر السعيد!",
    eidDescription: "نحتفل بنهاية شهر رمضان بفرح وامتنان",
    eidTips: "تقاليد العيد",
    eidTipsList: [
      "أداء صلاة العيد في الصباح",
      "إخراج زكاة الفطر قبل صلاة العيد",
      "ارتداء أفضل الملابس",
      "تبادل التهاني مع العائلة والأصدقاء",
      "مشاركة الطعام والهدايا مع الآخرين",
      "زيارة الأقارب والجيران"
    ],
    eidDuas: [
      "تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
      "تقبل الله منا ومنكم",
      "اللَّهُمَّ أَعِدْهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ",
      "اللهم أعده علينا باليمن والإيمان والسلامة والإسلام"
    ],
    eidActivities: "أنشطة العيد",
    eidActivitiesList: [
      "حضور صلاة العيد",
      "زيارة العائلة والأصدقاء",
      "تقديم الهدايا للأطفال",
      "إعداد وجبات خاصة",
      "التبرع للجمعيات الخيرية",
      "الاتصال بالأقارب البعيدين"
    ]
  }
};
 const getRamadanDay = () => {
  const startRamadan = new Date("2025-03-01");
  const endRamadan = new Date("2025-04-01");
  const today = new Date();
  
  if (today < startRamadan) {
    return "Ramadan hasn't started yet this year.";
  }
  
  if (today > endRamadan) {
    const eidEndDate = new Date("2025-04-03");
    if (today <= eidEndDate) {
      return "Eid al-Fitr";
    }
    return "Ramadan has ended for this year.";
  }
  
  const diffTime = today - startRamadan;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};
const getEventTimes = () => {
  const now = new Date();
  
  const imsakTime = new Date();
  imsakTime.setHours(4, 33, 0, 0);
  if (now.getHours() > 4 || (now.getHours() === 4 && now.getMinutes() >= 33 )) {
    imsakTime.setDate(imsakTime.getDate() + 1);
  }
  
  const iftarTime = new Date();
  iftarTime.setHours(18, 47, 0, 0);
  if (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() >= 47)) {
    iftarTime.setDate(iftarTime.getDate() + 1);
  }
  
  return {
    imsakTime,
    iftarTime,
    imsakTimeString: imsakTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    iftarTimeString: iftarTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
  };
};
const isEid = () => {
  const today = new Date();
  const endRamadan = new Date("2025-04-01");
  const eidEndDate = new Date("2025-04-03");
  
  return today > endRamadan && today <= eidEndDate;
};
const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ramadanDay, setRamadanDay] = useState(getRamadanDay());
  const [language, setLanguage] = useState("en");
  
  const [targetEvent, setTargetEvent] = useState("iftar");
  const [targetTime, setTargetTime] = useState(null);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [totalSeconds, setTotalSeconds] = useState(0);
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [isTimeReached, setIsTimeReached] = useState(false);
  const [celebrationEvent, setCelebrationEvent] = useState(null);
  
  const [darkMode, setDarkMode] = useState(false);
  const [dailyDuaIndex, setDailyDuaIndex] = useState(0);
  const [dailyTipIndex, setDailyTipIndex] = useState(0);
  const [showQuranPopup, setShowQuranPopup] = useState(false);
  
  const [eidMode, setEidMode] = useState(isEid());
  const [showEidMessage, setShowEidMessage] = useState(false);
  
  const audioRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const timerRef = useRef(null);
  const forceUpdateRef = useRef(false);
  
 useEffect(() => {
  const ramadanStatus = getRamadanDay();
  const isEidPeriod = isEid();
  
  setEidMode(isEidPeriod || ramadanStatus === "Eid al-Fitr");
  
  if ((isEidPeriod || ramadanStatus === "Eid al-Fitr") && !showEidMessage) {
    setShowConfetti(true);
    setShowEidMessage(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 200000); 
  }
}, [currentTime, showEidMessage]);
  useEffect(() => {
    const updateEventTimes = () => {
      const { imsakTime, iftarTime } = getEventTimes();
      const now = new Date();
      
      let nextEvent, nextTime;
      const timeToImsak = imsakTime - now;
      const timeToIftar = iftarTime - now;
      
      if ((timeToImsak < timeToIftar && timeToImsak > 0) && !forceUpdateRef.current) {
        nextEvent = "imsak";
        nextTime = imsakTime;
      } else {
        nextEvent = "iftar";
        nextTime = iftarTime;
      }
      
      forceUpdateRef.current = false;
      
      setTargetEvent(nextEvent);
      setTargetTime(nextTime);
      
      console.log(`Target event set to: ${nextEvent} at ${nextTime}`);
    };
    
    updateEventTimes();
    
    const eventTimer = setInterval(updateEventTimes, 3600000);
    
    return () => clearInterval(eventTimer);
  }, []);
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date());
      setRamadanDay(getRamadanDay());
    }, 1000);
    
    return () => clearInterval(clockTimer);
  }, []);
  useEffect(() => {
    const day = new Date().getDate();
    setDailyDuaIndex(day % translations[language].duas.length);
    setDailyTipIndex(day % translations[language].fastingTips.length);
  }, [language, currentTime]);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  useEffect(() => {
    if (!targetTime) return;
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetTime - now;
      const totalSecs = Math.floor(difference / 1000);
      
      setTotalSeconds(totalSecs);
      setHours(String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"));
      setMinutes(String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"));
      setSeconds(String(Math.floor((difference / 1000) % 60)).padStart(2, "0"));
      
      if (totalSecs <= 60 && totalSecs > 0) {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        document.body.classList.add('final-countdown');
      } else {
        document.body.classList.remove('final-countdown');
        if (audioRef.current && audioRef.current.played.length > 0) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
      
      if (totalSecs <= 0 && !isTimeReached) {
        setShowConfetti(true);
        setIsTimeReached(true);
        setCelebrationEvent(targetEvent);
        document.body.classList.add('time-reached');
        
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        
        if (celebrationTimerRef.current) {
          clearTimeout(celebrationTimerRef.current);
        }
        
        celebrationTimerRef.current = setTimeout(() => {
          setIsTimeReached(false);
          setShowConfetti(false);
          document.body.classList.remove('time-reached');
          
          forceUpdateRef.current = true;
          const nextEvent = targetEvent === "imsak" ? "iftar" : "imsak";
          console.log(`Celebration ended. Switching from ${targetEvent} to ${nextEvent}`);
          
          const { imsakTime, iftarTime } = getEventTimes();
          if (nextEvent === "imsak") {
            setTargetEvent("imsak");
            setTargetTime(imsakTime);
          } else {
            setTargetEvent("iftar");
            setTargetTime(iftarTime);
          }
        }, 120000);
      }
    };
    
    updateCountdown();
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(updateCountdown, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [targetTime, isTimeReached, targetEvent]);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (celebrationTimerRef.current) clearTimeout(celebrationTimerRef.current);
      document.body.classList.remove('final-countdown', 'time-reached', 'dark-mode');
    };
  }, []);
  const { imsakTimeString, iftarTimeString } = getEventTimes();
  const isFlashing = totalSeconds <= 60 && totalSeconds > 0;
  const t = translations[language];
  const currentTimeString = currentTime.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit", 
    second: "2-digit", 
    hour12: true 
  });
  
  const hoursNum = parseInt(hours, 10);
  const minutesNum = parseInt(minutes, 10);
  const secondsNum = parseInt(seconds, 10);
  if (eidMode) {
    return (
      <div className={`container eid-mode ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={500} />}
        
        <div className="app-controls">
          <button 
            className="icon-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={t.darkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          
          <button 
            className="language-button"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </div>
        
        <div className="eid-header">
          <h1 className="eid-title">{t.eidMubarak}</h1>
          <p className="eid-subtitle">{t.eidMessage}</p>
        </div>
        
        <div className="highlight-box eid-highlight">
          <p><FaCalendarAlt className="icon" /> {t.eidTitle}</p>
          <p><FaClock className="icon" /> {t.currentTime} {currentTimeString}</p>
          <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
        </div>
        
        <div className="eid-cards">
          <div className="card eid-card">
            <h3><FaPray className="icon" /> {t.eidDuas[0]}</h3>
            <p className="dua-text">{t.eidDuas[1]}</p>
            <p className="dua-text arabic-text">{t.eidDuas[2]}</p>
            <p className="dua-text">{t.eidDuas[3]}</p>
          </div>
        </div>
        
        <div className="feature-cards">
          <div className="card eid-tips-card">
            <h3><FaGift className="icon" /> {t.eidTips}</h3>
            <ul className="eid-list">
              {t.eidTipsList.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
          
          <div className="card eid-activities-card">
            <h3><FaHandsHelping className="icon" /> {t.eidActivities}</h3>
            <ul className="eid-list">
              {t.eidActivitiesList.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="quote-box eid-quote">
          <p className="quote">{t.eidDescription}</p>
        </div>
        
        <div className="action-buttons">
          <button 
            className="action-button"
            onClick={() => setShowQuranPopup(true)}
          >
            <FaQuran className="icon" /> Quran Verse
          </button>
          
          <button 
            className="action-button info-button"
            onClick={() => window.open("https://islamqa.info/en/categories/very-important/eid", "_blank")}
          >
            <FaInfoCircle className="icon" /> Eid Guide
          </button>
        </div>
        
        {showQuranPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button" onClick={() => setShowQuranPopup(false)}>×</button>
              <h2>Quran Verse for Eid</h2>
              <p className="arabic-text">
                وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ
              </p>
              <p>
                "And [wants] for you to complete the period and to glorify Allah for that [to] which He has guided you; and perhaps you will be grateful." (Al-Baqarah 2:185)
              </p>
            </div>
          </div>
        )}
        
        <footer className="footer">
          {t.footer}
        </footer>
      </div>
    );
  }
  // Regular Ramadan mode UI
  return (
    <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className="app-controls">
        <button 
          className="icon-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={t.darkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        
        <button 
          className="language-button"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        >
          {language === "en" ? "العربية" : "English"}
        </button>
      </div>
      
      <h1 className="title">
        {isTimeReached ? `${t[celebrationEvent]} ${t.titleTime}` : `${t.title} ${t[targetEvent]}`}
      </h1>
      <div className="countdown-container">
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : hours}
          <span className="label">{hoursNum === 1 ? t.hour : t.hours}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : minutes}
          <span className="label">{minutesNum === 1 ? t.minute : t.minutes}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : seconds}
          <span className="label">{secondsNum === 1 ? t.second : t.seconds}</span>
        </div>
      </div>
      
      <div className={`location-note-highlight ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <FaInfoCircle className="note-highlight-icon" />
        <span className="note-highlight-text">{t.locationNote}</span>
      </div>
      
      <div className="highlight-box">
        <p><FaCalendarAlt className="icon" /> {t.ramadanDay} {ramadanDay}</p>
        <p><FaClock className="icon" /> {t.currentTime} {currentTimeString}</p>
        <p className="prayer-times">
          <span><FaCloudSun className="icon" /> {t.imsakLabel} {imsakTimeString}</span>
          <span><FaCloudMoon className="icon" /> {t.iftarLabel} {iftarTimeString}</span>
        </p>
        <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
      </div>
      
      <p className="message">
        {isTimeReached 
          ? (celebrationEvent === "imsak" ? t.imsakMessage : t.iftarMessage)
          : `${targetEvent === "imsak" ? t.imsakCountdown : t.iftarCountdown} ${t.comingSoon}`}
      </p>
      
      <div className="feature-cards">
        <div className="card dua-card">
          <h3><FaQuran className="icon" /> {t.dailyDua}</h3>
          <p className="dua-text">{t.duas[dailyDuaIndex]}</p>
        </div>
        
        <div className="card tip-card">
          <h3><FaInfoCircle className="icon" style={{ marginRight: '8px' }} /> {t.todaysFastingTip}</h3>
          <p>{t.fastingTips[dailyTipIndex]}</p>
        </div>
      </div>
      
      <div className="quote-box">
        <p className="quote">{t.inspirationalQuote}</p>
      </div>
      
      <div className="weather-info">
        <p><FaTemperatureHigh className="icon" style={{ marginRight: '5px' }} /> {t.weatherInfo}</p>
      </div>
      
      {showQuranPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={() => setShowQuranPopup(false)}>×</button>
            <h2>Quran Verse of the Day</h2>
                      <p className="arabic-text">
              شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ
            </p>
            <p>
              "The month of Ramadan is that in which was revealed the Quran, a guidance for mankind and clear proofs for guidance and criterion." (Al-Baqarah 2:185)
            </p>
          </div>
        </div>
      )}
      <div className="action-buttons">
        <button 
          className="action-button"
          onClick={() => setShowQuranPopup(true)}
        >
          <FaQuran className="icon" /> Quran Verse
        </button>
        
        <button 
          className="action-button info-button"
          onClick={() => window.open("https://islamqa.info/en/categories/very-important/ramadan", "_blank")}
        >
          <FaInfoCircle className="icon" /> Ramadan Guide
        </button>
      </div>
      <audio ref={audioRef} src={countdownSound} loop />
      <footer className="footer">
        {t.footer}
      </footer>
    </div>
  );
};
export default App;

  
