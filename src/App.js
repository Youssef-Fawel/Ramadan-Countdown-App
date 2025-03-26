import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import "./App.css";
import countdownSound from "./countdown-sound.mp3";
import { FaMoon, FaSun, FaQuran, FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";


const translations = {
  en: {
    title: "Countdown to",
    titleTime: "Time! 🌙",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    ramadanDay: "Today is Ramadan Day:",
    currentTime: "Current Time:",
    imsak: "Imsak:",
    iftar: "Iftar:",
    stayStrong: "Stay strong!",
    comingSoon: "is coming soon.",
    itsTime: "It's time for",
    imsak: "Imsak",
    iftar: "Iftar",
    imsakMessage: "It's time to start fasting. Stop eating and drinking now.",
    iftarMessage: "Enjoy your meal and prayers.",
    imsakCountdown: "Prepare for Suhoor! Imsak",
    iftarCountdown: "Stay strong! Iftar",
    footer: "Designed with ❤️ for Ramadan 2025",
    notStarted: "Ramadan hasn't started yet this year.",
    dailyDua: "Dua of the Day",
    location: "Location: Sousse, Tunisia",
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
    darkMode: "Toggle Dark Mode"
  },
  ar: {
    title: "العد التنازلي إلى",
    titleTime: "حان الوقت! 🌙",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    ramadanDay: "اليوم هو يوم رمضان:",
    currentTime: "الوقت الحالي:",
    imsak: "الإمساك:",
    iftar: "الإفطار:",
    stayStrong: "كن قوياً!",
    comingSoon: "قادم قريباً.",
    itsTime: "حان وقت",
    imsak: "الإمساك",
    iftar: "الإفطار",
    imsakMessage: "حان وقت بدء الصيام. توقف عن الأكل والشرب الآن.",
    iftarMessage: "استمتع بوجبتك وصلاتك.",
    imsakCountdown: "استعد للسحور! الإمساك",
    iftarCountdown: "كن قوياً! الإفطار",
    footer: "صُمم بكل ❤️ لرمضان 2025",
    notStarted: "لم يبدأ رمضان بعد هذا العام.",
    dailyDua: "دعاء اليوم",
    location: "الموقع: سوسة، تونس",
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
    darkMode: "تبديل الوضع المظلم"
  }
};


const getRamadanDay = () => {
  const startRamadan = new Date("2025-03-01");
  const today = new Date();
  if (today < startRamadan) {
    return "Ramadan hasn't started yet this year.";
  }
  const diffTime = today - startRamadan;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};


const getEventTimes = () => {
  const now = new Date();
  
  const imsakTime = new Date();
  imsakTime.setHours(4, 39, 0, 0);
  if (now.getHours() > 4 || (now.getHours() === 4 && now.getMinutes() >= 39 )) {
    imsakTime.setDate(imsakTime.getDate() + 1);
  }
  
  const iftarTime = new Date();
  iftarTime.setHours(18, 43, 0, 0);
  if (now.getHours() > 18 || (now.getHours() === 18 && now.getMinutes() >= 43)) {
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
  const currentTimeString = currentTime.toLocaleTimeString();

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
          <span className="label">{t.hours}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : minutes}
          <span className="label">{t.minutes}</span>
        </div>
        <div className={`time-box ${isFlashing ? 'flashing' : ''}`}>
          {isTimeReached ? "00" : seconds}
          <span className="label">{t.seconds}</span>
        </div>
      </div>

      <div className="highlight-box">
        <p><FaCalendarAlt className="icon" /> {t.ramadanDay} {ramadanDay}</p>
        <p>{t.currentTime} {currentTimeString}</p>
        <p>{t.imsak} {imsakTimeString} | {t.iftar} {iftarTimeString}</p>
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
          <h3>{t.todaysFastingTip}</h3>
          <p>{t.fastingTips[dailyTipIndex]}</p>
        </div>
      </div>

      <div className="quote-box">
        <p className="quote">{t.inspirationalQuote}</p>
      </div>

      <div className="weather-info">
        <p>{t.weatherInfo}</p>
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
              "The month of Ramadan is that in which was revealed the Quran, a guidance for the people and clear proofs of guidance and criterion." (Al-Baqarah 2:185)
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
          onClick={() => window.open("https://islamqa.info/en/categories/very-important/fasting", "_blank")}
        >
          <FaInfoCircle className="icon" /> Fasting Guide
        </button>
      </div>

      <footer className="footer">
        {t.footer}
      </footer>
      
      <audio ref={audioRef} src={countdownSound} loop />
    </div>
  );
};

export default App;

