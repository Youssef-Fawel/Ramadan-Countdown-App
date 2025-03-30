import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";
import countdownSound from "./countdown-sound.mp3";
import { FaTemperatureHigh, FaMoon, FaSun, FaQuran, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaClock, FaCloudSun, FaCloudMoon } from "react-icons/fa";

const translations = {
  en: {
    title: "Countdown to",
    titleTime: "Time! 🌙",
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
    footer: "Designed with ❤️ for Ramadan 2025 by Youssef Fawel",
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
    ramadanEnded: "Ramadan has ended for this year.",
    eidMubarak: "Eid Mubarak! 🌙",
    eidMessage: "May Allah accept your fasts, prayers, and good deeds."
  },
  ar: {
    title: "العد التنازلي إلى",
    titleTime: "حان الوقت! 🌙",
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
    footer: "صُمم بكل ❤️ لرمضان 2025 من تصميم يوسف فوال",
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
    ramadanEnded: "انتهى شهر رمضان لهذا العام.",
    eidMubarak: "عيد مبارك! 🌙",
    eidMessage: "تقبل الله منا ومنكم صالح الأعمال"
  }
};

const getRamadanDay = () => {
  const startRamadan = new Date("2025-03-01");
  const endRamadan = new Date("2025-04-01");
  const today = new Date();
  
  if (today < startRamadan) {
    return "notStarted";
  }
  
  if (today > endRamadan) {
    const eidEndDate = new Date("2025-04-03");
    if (today <= eidEndDate) {
      return "eid";
    }
    return "ended";
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
  
  const audioRef = useRef(null);
  const celebrationTimerRef = useRef(null);
  const timerRef = useRef(null);
  const forceUpdateRef = useRef(false);
  
  // Check if Ramadan has ended or it's Eid
  useEffect(() => {
    const status = getRamadanDay();
    setRamadanDay(status);
    
    if (status === "eid" && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  }, [currentTime, showConfetti]);

  useEffect(() => {
    if (ramadanDay === "notStarted" || ramadanDay === "ended" || ramadanDay === "eid") {
      return; // Don't set up countdown if Ramadan hasn't started or has ended
    }
    
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
    };
    
    updateEventTimes();
    
    const eventTimer = setInterval(updateEventTimes, 3600000);
    
    return () => clearInterval(eventTimer);
  }, [ramadanDay]);

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
    if (!targetTime || ramadanDay === "notStarted" || ramadanDay === "ended" || ramadanDay === "eid") return;
    
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
  }, [targetTime, isTimeReached, targetEvent, ramadanDay]);

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

  // Render Eid message if it's Eid
  if (ramadanDay === "eid") {
    return (
      <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
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
        
        <div className="eid-container">
          <h1 className="eid-title">{t.eidMubarak}</h1>
          <p className="eid-message">{t.eidMessage}</p>
          
          <div className="highlight-box">
            <p><FaCalendarAlt className="icon" /> {t.currentTime} {currentTimeString}</p>
            <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
          </div>
        </div>
        
        <footer className="footer">
          {t.footer}
        </footer>
      </div>
    );
  }

  // Render message if Ramadan has ended but it's not Eid
  if (ramadanDay === "ended") {
    return (
      <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
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
        
<div className="ramadan-ended-container">
  <h1>{t.ramadanEnded}</h1>
  
  <div className="highlight-box">
    <p><FaCalendarAlt className="icon" /> {t.currentTime} {currentTimeString}</p>
    <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
  </div>
</div>

<footer className="footer">
  {t.footer}
</footer>
</div>
);
}

  // Render message if Ramadan hasn't started yet
  if (ramadanDay === "notStarted") {
    return (
      <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
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
        
        <div className="not-started-container">
          <h1>{t.notStarted}</h1>
          <p>{t.inspirationalQuote}</p>
          
          <div className="highlight-box">
            <p><FaCalendarAlt className="icon" /> {t.currentTime} {currentTimeString}</p>
            <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
          </div>
        </div>
        
        <footer className="footer">
          {t.footer}
        </footer>
      </div>
    );
  }

  // Main Ramadan countdown display
  return (
    <div className={`container ${language === 'ar' ? 'rtl' : 'ltr'} ${darkMode ? 'dark-mode' : ''}`}>
      <audio ref={audioRef} src={countdownSound} loop />
      
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
        
        <button 
          className="icon-button"
          onClick={() => setShowQuranPopup(!showQuranPopup)}
          aria-label="Quran"
        >
          <FaQuran />
        </button>
      </div>
      
      {showQuranPopup && (
        <div className="quran-popup">
          <button className="close-button" onClick={() => setShowQuranPopup(false)}>×</button>
          <h3>{t.dailyDua}</h3>
          <p className="arabic-text">{t.duas[dailyDuaIndex]}</p>
          <p>{t.duas[dailyDuaIndex + 1 >= t.duas.length ? 0 : dailyDuaIndex + 1]}</p>
        </div>
      )}
      
      <div className="info-container">
        <div className="info-box">
          <p><FaCalendarAlt className="icon" /> {t.ramadanDay} {ramadanDay}</p>
          <p><FaClock className="icon" /> {t.currentTime} {currentTimeString}</p>
          <p><FaCloudSun className="icon" /> {t.imsakLabel} {imsakTimeString}</p>
          <p><FaCloudMoon className="icon" /> {t.iftarLabel} {iftarTimeString}</p>
          <p><FaMapMarkerAlt className="icon" /> {t.location}</p>
          <p className="location-note"><FaInfoCircle className="icon" /> {t.locationNote}</p>
        </div>
        
        <div className="tip-box">
          <h3>{t.todaysFastingTip}</h3>
          <p>{t.fastingTips[dailyTipIndex]}</p>
        </div>
      </div>
      
      {isTimeReached ? (
        <div className="celebration-container">
          <h1 className="celebration-title">{t.titleTime}</h1>
          <p className="celebration-message">
            {t.itsTime} {celebrationEvent === "imsak" ? t.imsak : t.iftar}
          </p>
          <p className="celebration-instructions">
            {celebrationEvent === "imsak" ? t.imsakMessage : t.iftarMessage}
          </p>
        </div>
      ) : (
        <div className="countdown-container">
          <h1 className="countdown-title">
            {targetEvent === "imsak" ? t.imsakCountdown : t.iftarCountdown} {t.title}
          </h1>
          
          <div className={`countdown-timer ${isFlashing ? 'flashing' : ''}`}>
            <div className="countdown-box">
              <span className="countdown-number">{hours}</span>
              <span className="countdown-label">
                {hoursNum === 1 ? t.hour : t.hours}
              </span>
            </div>
            
            <div className="countdown-box">
              <span className="countdown-number">{minutes}</span>
              <span className="countdown-label">
                {minutesNum === 1 ? t.minute : t.minutes}
              </span>
            </div>
            
            <div className="countdown-box">
              <span className="countdown-number">{seconds}</span>
              <span className="countdown-label">
                {secondsNum === 1 ? t.second : t.seconds}
              </span>
            </div>
          </div>
          
          <p className="countdown-message">
            {t.stayStrong} {targetEvent === "imsak" ? t.imsak : t.iftar} {t.comingSoon}
          </p>
        </div>
      )}
      
      <footer className="footer">
        {t.footer}
      </footer>
    </div>
  );
};

export default App;
