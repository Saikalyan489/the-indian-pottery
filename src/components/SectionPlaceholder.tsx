import React from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { SectionContent } from '../types';
import {
  Lightbulb,
  ArrowUpRight,
  Compass,
  Sparkles,
  Heart,
  Leaf,
} from 'lucide-react';
import { AncientTimeScrubber } from './AncientTimeScrubber';
import { EvaporativeCoolingDemo } from './EvaporativeCoolingDemo';
import { useLanguage } from '../context/LanguageContext';

interface SectionPlaceholderProps {
  section: SectionContent;
  isEven: boolean;
  onNavigateNext?: () => void;
  nextSectionLabel?: string;
}

export const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({
  section,
  isEven,
  onNavigateNext,
  nextSectionLabel,
}) => {
  const { ui, language } = useLanguage();
  const shouldReduceMotion = usePrefersReducedMotion();

  // Render chapter-specific interactive widgets
  const renderInteractiveChapterBody = () => {
    if (section.id === 'ancient-india') {
      return <AncientTimeScrubber />;
    }
    if (section.id === 'objects') {
      return <EvaporativeCoolingDemo />;
    }
    return null;
  };

  // Render varied visual feature cards depending on the chapter topic
  // Multilingual visual feature dictionaries for each chapter
  const CHAPTER_VISUALS: Record<
    string,
    Record<
      string,
      {
        title: string;
        desc: string;
        name?: string;
        tag?: string;
        step?: string;
        season?: string;
        role?: string;
        era?: string;
        date?: string;
      }[]
    >
  > = {
    'before-pottery': {
      en: [
        { title: 'Bottle Gourds', desc: 'Kamandalu shells dried for water', tag: 'Botanical' },
        { title: 'Bitumen Baskets', desc: 'Mehrgarh reeds sealed with asphalt', tag: 'Aceramic' },
        { title: 'Carved Steatite', desc: 'Soft soapstone & sandstone bowls', tag: 'Lithic' },
        { title: 'Stitched Skins', desc: 'Mashaq leather nomadic water bags', tag: 'Faunal' },
      ],
      te: [
        { title: 'ఆనపకాయ బుర్రలు', desc: 'నీటిని నిల్వ చేయడానికి ఎండబెట్టిన కమండలాలు', tag: 'వృక్ష సంబంధిత' },
        { title: 'తారు పూసిన బుట్టలు', desc: 'మెహర్‌గఢ్ రెల్లుగడ్డి బుట్టలకు జిగురు తారు పూత', tag: 'మట్టిరహిత' },
        { title: 'చెక్కిన బలపపు రాయి', desc: 'సున్నితమైన సబ్బురాయి మరియు ఇసుకరాయి గిన్నెలు', tag: 'శిలా యుగం' },
        { title: 'కుట్టిన జంతు చర్మాలు', desc: 'సంచార జాతులు నీటిని మోసే తోలు తిత్తులు (మషక్)', tag: 'చర్మ సంబంధిత' },
      ],
      hi: [
        { title: 'सूखी लौकी के तुम्बे', desc: 'पानी भरने के लिए सुखाए गए कमंडल', tag: 'वानस्पतिक' },
        { title: 'तारकोल पुती टोकरियां', desc: 'मेहरगढ़ की सरकंडे की टोकरियों पर डामर की परत', tag: 'मिट्टी-पूर्व' },
        { title: 'तराशे हुए सोपस्टोन', desc: 'मुलायम सेलखड़ी व बलुआ पत्थर के कटोरे', tag: 'पाषाण' },
        { title: 'सिले हुए चमड़े की मशक', desc: 'घुमंतू शिकारियों के पानी ले जाने वाले थैले', tag: 'पशुजन्य' },
      ],
      ta: [
        { title: 'சுரைக்காய் குடுவைகள்', desc: 'நீர் சேமிக்க உலர்த்தப்பட்ட கமண்டலங்கள்', tag: 'தாவரவியல்' },
        { title: 'தார் பூசிய கூடைகள்', desc: 'மெஹர்கர் நாணல் கூடைகளில் தார் பூச்சு', tag: 'மட்பாண்ட முன்' },
        { title: 'செதுக்கப்பட்ட மாக்கல்', desc: 'மென்மையான சோப்ஸ்டோன் பாத்திரங்கள்', tag: 'கற்காலம்' },
        { title: 'தைக்கப்பட்ட தோல் பைகள்', desc: 'நாடோடிகள் நீர் சுமக்கும் மஷக் தோல் பைகள்', tag: 'விலங்குத் தோல்' },
      ],
      ml: [
        { title: 'ചുരയ്ക്ക പാത്രങ്ങൾ', desc: 'വെള്ളം സൂക്ഷിക്കാൻ ഉണക്കിയ കമണ്ഡലു തോടുകൾ', tag: 'സസ്യജന്യം' },
        { title: 'താർ പുരട്ടിയ കൊട്ടകൾ', desc: 'മെഹർഗഡ് ഈറ്റക്കൊട്ടകളിൽ താൽപ്പൂശിയ പാത്രങ്ങൾ', tag: 'മൺപാത്ര മുൻപ്' },
        { title: 'കൊത്തുപണി ചെയ്ത കല്ല്', desc: 'മൃദുവായ സോപ്സ്റ്റോൺ കിണ്ണങ്ങൾ', tag: 'ശിലായുഗം' },
        { title: 'തുന്നിയ തോൽ സഞ്ചികൾ', desc: 'നാടോടികൾ വെള്ളം കൊണ്ടുപോയ തോൽക്കുടുക്കകൾ', tag: 'തോൽ ജന്യം' },
      ],
      kn: [
        { title: 'ಸೊರೆಕಾಯಿ ಬುರುಡೆಗಳು', desc: 'ನೀರು ತುಂಬಲು ಒಣಗಿಸಿದ ಕಮಂಡಲಗಳು', tag: 'ಸಸ್ಯಜನ್ಯ' },
        { title: 'ಡಾಂಬರು ಲೇಪಿತ ಬುಟ್ಟಿಗಳು', desc: 'ಮೆಹರ್‌ಗಢ್ ಜೊಂಡು ಬುಟ್ಟಿಗಳಿಗೆ ಡಾಂಬರು ಲೇಪನ', tag: 'ಮಣ್ಣಿನ ಪೂರ್ವ' },
        { title: 'ಕೆತ್ತಿದ ಬಳಪದ ಕಲ್ಲು', desc: 'ಮೃದುವಾದ ಬಳಪದ ಕಲ್ಲಿನ ಬಟ್ಟಲುಗಳು', tag: 'ಶಿಲಾಯುಗ' },
        { title: 'ಹೊಲಿದ ಚರ್ಮದ ಚೀಲಗಳು', desc: 'ಅಲೆಮಾರಿಗಳು ನೀರು ಸಾಗಿಸಲು ಬಳಸಿದ ಮಷಕ್ ಚರ್ಮದ ಚೀಲ', tag: 'ಪ್ರಾಣಿಜನ್ಯ' },
      ],
    },
    origins: {
      en: [
        { step: '1', title: 'Riverbank Silt', desc: 'Fine plastic mud deposited by seasonal monsoon floods' },
        { step: '2', title: 'Accidental Firing', desc: 'Campfire embers bake clay pots hard and waterproof' },
        { step: '3', title: 'Durable Vessels', desc: 'The cooking revolution allows boiling grains and stewing' },
      ],
      te: [
        { step: '1', title: 'నదీ ఒండ్రు మట్టి', desc: 'వర్షాకాలపు వరదలతో నదీ తీరాల్లో చేరిన అతి మెత్తని నల్లరేగడి మట్టి' },
        { step: '2', title: 'అనుకోకుండా నిప్పు తాకడం', desc: 'క్యాంప్‌ఫైర్ నిప్పుల వేడికి మట్టి ముద్ద రాయిలా గట్టిపడి నీటిని తట్టుకుంది' },
        { step: '3', title: 'చిరకాలం ఉండే పాత్రలు', desc: 'వంట విప్లవానికి నాంది పలికి, ధాన్యాలను ఉడికించడం సాధ్యమైంది' },
      ],
      hi: [
        { step: '1', title: 'नदी की गाद व चिकनी मिट्टी', desc: 'मानसूनी बाढ़ द्वारा लाई गई अत्यंत लचीली व महीन उपजाऊ मिट्टी' },
        { step: '2', title: 'अलाव में संयोगवश पकना', desc: 'आग की लपटों ने कच्ची मिट्टी को पत्थर सा ठोस और जलरोधी बना दिया' },
        { step: '3', title: 'मजबूत बर्तनों का युग', desc: 'भोजन पकाने की क्रांति जिसने अनाज उबालना और पकाना संभव बनाया' },
      ],
      ta: [
        { step: '1', title: 'ஆற்றுப்படுகை வண்டல் மண்', desc: 'பருவமழை வெள்ளத்தால் படியும் மிருதுவான களிமண்' },
        { step: '2', title: 'நெருப்பில் தற்செயல் சுடுதல்', desc: 'நெருப்புக்கனலில் களிமண் சுடப்பட்டு கல்போல உறுதியானது' },
        { step: '3', title: 'நீடித்து நிற்கும் பாண்டங்கள்', desc: 'தானியங்களை வேகவைத்து சமைக்கும் சமையல் புரட்சி தொடங்கியது' },
      ],
      ml: [
        { step: '1', title: 'തീരത്തെ എക്കൽ മണ്ണ്', desc: 'മൺസൂൺ വെള്ളപ്പൊക്കത്തിൽ അടിഞ്ഞുകൂടിയ കുഴമ്പ് മണ്ണ്' },
        { step: '2', title: 'അഗ്നിയിലെ ആകസ്മിക പാകം', desc: 'തീച്ചൂളയിലെ ചൂടേറ്റ് മൺപാത്രം കല്ലുപോലെ ഉറച്ചു' },
        { step: '3', title: 'ഈടുനിൽക്കുന്ന പാത്രങ്ങൾ', desc: 'ധാന്യങ്ങൾ വേവിക്കാനും സൂക്ഷിക്കാനും സഹായിച്ച പാചക വിപ്ലവം' },
      ],
      kn: [
        { step: '1', title: 'ನದಿಯ ಮೆಕ್ಕಲು ಜೇಡಿಮಣ್ಣು', desc: 'ಮಳೆಗಾಲದ ಪ್ರವಾಹದಿಂದ ದಡದಲ್ಲಿ ಶೇಖರವಾದ ನಯವಾದ ಮಣ್ಣು' },
        { step: '2', title: 'ಬೆಂಕಿಯಲ್ಲಿ ಆಕಸ್ಮಿಕವಾಗಿ ಬೇಯುವುದು', desc: 'ಬೆಂಕಿಯ ಕೆಂಡದಲ್ಲಿ ಮಣ್ಣಿನ ಮುದ್ದೆ ಕಲ್ಲಿನಂತೆ ಗಟ್ಟಿಯಾಗಿ ಜಲನಿರೋಧಕವಾಯಿತು' },
        { step: '3', title: 'ಬಾಳಿಕೆ ಬರುವ ಪಾತ್ರೆಗಳು', desc: 'ಧಾನ್ಯಗಳನ್ನು ಬೇಯಿಸುವ ಪಾಕಶಾಸ್ತ್ರ ಕ್ರಾಂತಿಗೆ ನಾಂದಿ ಹಾಡಿತು' },
      ],
    },
    'everyday-life': {
      en: [
        { season: '☀️ Summer', title: '☀️ Summer', desc: 'Naturally chilled water from porous matkas' },
        { season: '🌧️ Monsoons', title: '🌧️ Monsoons', desc: 'Hot street chai in disposable earth kulhads' },
        { season: '🪔 Festivals', title: '🪔 Festivals', desc: 'Warm oil lamps for Diwali & Karthika Deepam' },
      ],
      te: [
        { season: '☀️ వేసవి కాలం', title: '☀️ వేసవి కాలం', desc: 'రంధ్రాలున్న మట్టి కుండల నుండి సహజ సిద్ధమైన చల్లని అమృత జలం' },
        { season: '🌧️ వర్షాకాలం', title: '🌧️ వర్షాకాలం', desc: 'సొగసైన కుల్హడ్‌లలో సువాసనభరితమైన వేడి వేడి టీ' },
        { season: '🪔 పండుగలు', title: '🪔 పండుగలు', desc: 'దీపావళి మరియు కార్తీక దీపోత్సవాల మంగళకరమైన మట్టి ప్రమిదలు' },
      ],
      hi: [
        { season: '☀️ ग्रीष्म ऋतु', title: '☀️ ग्रीष्म ऋतु', desc: 'मिट्टी के मटकों से स्वाभाविक रूप से शीतल व मीठा जल' },
        { season: '🌧️ वर्षा ऋतु', title: '🌧️ वर्षा ऋतु', desc: 'सौंधी खुशबू वाले मिट्टी के कुल्हड़ में गर्म चाय' },
        { season: '🪔 पावन पर्व', title: '🪔 पावन पर्व', desc: 'दीपावली और उत्सवों के लिए मिट्टी के पावन दीये' },
      ],
      ta: [
        { season: '☀️ கோடைகாலம்', title: '☀️ கோடைகாலம்', desc: 'மண் பானைகளிலிருந்து இயற்கையாகக் குளிர்ந்த நீர்' },
        { season: '🌧️ மழைக்காலம்', title: '🌧️ மழைக்காலம்', desc: 'சுவையான குல்ஹத் சுடு தேநீர்' },
        { season: '🪔 திருவிழாக்கள்', title: '🪔 திருவிழாக்கள்', desc: 'தீபாவளி மற்றும் கார்த்திகை தீப மண் அகல் விளக்குகள்' },
      ],
      ml: [
        { season: '☀️ വേനൽക്കാലം', title: '☀️ വേനൽക്കാലം', desc: 'മൺകലങ്ങളിൽ നിന്നുള്ള സ്വാഭാവിക തണുത്ത വെള്ളം' },
        { season: '🌧️ മഴക്കാലം', title: '🌧️ മഴക്കാലം', desc: 'മൺകപ്പുകളിലെ മണമുള്ള ചൂടുചായ' },
        { season: '🪔 ഉത്സവങ്ങൾ', title: '🪔 ഉത്സവങ്ങൾ', desc: 'ദീപാവലിക്കും വിശേഷങ്ങൾക്കുമുള്ള മൺചിരാതുകൾ' },
      ],
      kn: [
        { season: '☀️ ಬೇಸಿಗೆ ಕಾಲ', title: '☀️ ಬೇಸಿಗೆ ಕಾಲ', desc: 'ಮಣ್ಣಿನ ಮಡಕೆಯ ನೈಸರ್ಗಿಕ ತಂಪಾದ ಅಮೃತ ಜಲ' },
        { season: '🌧️ ಮಳೆಗಾಲ', title: '🌧️ ಮಳೆಗಾಲ', desc: 'ಮಣ್ಣಿನ ಕುಲ್ಹಡ್‌ನಲ್ಲಿ ಸವಿಯುವ ಬಿಸಿಬಿಸಿ ಚಹಾ' },
        { season: '🪔 ಹಬ್ಬ-ಹರಿದಿನಗಳು', title: '🪔 ಹಬ್ಬ-ಹರಿದಿನಗಳು', desc: 'ದೀಪಾವಳಿ ಮತ್ತು ಕಾರ್ತಿಕ ಮಾಸದ ಮಣ್ಣಿನ ಹಣತೆಗಳು' },
      ],
    },
    'ancient-india': {
      en: [
        { era: 'Mehrgarh', date: '7000 BCE', title: 'Mehrgarh', desc: 'Hand-formed basket impressed ware' },
        { era: 'Harappan', date: '2600 BCE', title: 'Harappan', desc: 'Fast-wheel black-on-red urns' },
        { era: 'PGW Culture', date: '1200 BCE', title: 'PGW Culture', desc: 'Vedic thin-walled painted grey' },
        { era: 'NBP Ware', date: '600 BCE', title: 'NBP Ware', desc: 'Lustrous mirror-like glaze' },
      ],
      te: [
        { era: 'మెహర్‌గఢ్', date: 'క్రీ.పూ. 7000', title: 'మెహర్‌గఢ్', desc: 'బుట్టల అచ్చులతో చేతితో చేసిన మట్టి పాత్రలు' },
        { era: 'హరప్పా', date: 'క్రీ.పూ. 2600', title: 'హరప్పా నాగరికత', desc: 'వేగవంతమైన చక్రంపై తయారైన నలుపు-ఎరుపు పాత్రలు' },
        { era: 'పీజీడబ్ల్యూ', date: 'క్రీ.పూ. 1200', title: 'చిత్రిత బూడిద పాత్రలు', desc: 'వేద కాలపు సున్నితమైన పలచని కళాత్మక గిన్నెలు' },
        { era: 'ఎన్‌బీపీడబ్ల్యూ', date: 'క్రీ.పూ. 600', title: 'ఉత్తర నల్లని మెరుపు పాత్రలు', desc: 'ఉక్కు అద్దంలా మెరిసే అద్భుతమైన మెరుపు పూత' },
      ],
      hi: [
        { era: 'मेहरगढ़', date: '7000 ई.पू.', title: 'मेहरगढ़', desc: 'हाथ से गढ़े टोकरी-छाप प्राचीन बर्तन' },
        { era: 'हड़प्पा', date: '2600 ई.पू.', title: 'हड़प्पा सभ्यता', desc: 'चाक पर बने काले-लाल अलंकृत घड़े' },
        { era: 'चित्रित धूसर (PGW)', date: '1200 ई.पू.', title: 'पीजीडब्ल्यू संस्कृति', desc: 'वैदिक काल के महीन धूसर बर्तन' },
        { era: 'उत्तरी काली पॉलिश', date: '600 ई.पू.', title: 'एनबीपीडब्ल्यू', desc: 'धातु जैसी दर्पण सी चमक वाले पात्र' },
      ],
      ta: [
        { era: 'மெஹர்கர்', date: 'கி.மு. 7000', title: 'மெஹர்கர்', desc: 'கூடை அச்சு கைவினை மண்பாண்டங்கள்' },
        { era: 'ஹரப்பா', date: 'கி.மு. 2600', title: 'ஹரப்பா', desc: 'கருப்பு-சிவப்பு வண்ணப் பூச்சு ஜாடிகள்' },
        { era: 'சாம்பல் மட்பாண்டம்', date: 'கி.மு. 1200', title: 'பிஜிடபிள்யூ', desc: 'மெல்லிய சாம்பல் நிற உணவுப் பாத்திரங்கள்' },
        { era: 'பளபளப்பான கருப்பு', date: 'கி.மு. 600', title: 'என்பிபிடபிள்யூ', desc: 'கண்ணாடி போன்ற பளபளப்பான பூச்சு' },
      ],
      ml: [
        { era: 'മെഹർഗഡ്', date: 'ബി.സി. 7000', title: 'മെഹർഗഡ്', desc: 'കൊട്ടയച്ചുകളിൽ തീർത്ത ആദ്യ പാത്രങ്ങൾ' },
        { era: 'ഹാരപ്പൻ', date: 'ബി.സി. 2600', title: 'ഹാരപ്പൻ', desc: 'ചക്രത്തിൽ തീർത്ത കറുപ്പും ചുവപ്പും ഭരണികൾ' },
        { era: 'പി.ജി.ഡബ്ല്യു', date: 'ബി.സി. 1200', title: 'ചാരനിറ പാത്രങ്ങൾ', desc: 'മേൽത്തരം നേർത്ത ചാരനിറ പാത്രങ്ങൾ' },
        { era: 'എൻ.ബി.പി.ഡബ്ല്യു', date: 'ബി.സി. 600', title: 'മിനുസമാർന്ന കറുത്ത പാത്രങ്ങൾ', desc: 'ലോഹക്കണ്ണാടി പോലുള്ള തിളക്കമുള്ള ലേപനം' },
      ],
      kn: [
        { era: 'ಮೆಹರ್‌ಗಢ್', date: 'ಕ್ರಿ.ಪೂ. 7000', title: 'ಮೆಹರ್‌ಗಢ್', desc: 'ಬುಟ್ಟಿಯ ಅಚ್ಚಿನಲ್ಲಿ ಕೈಯಿಂದ ಮಾಡಿದ ಪಾತ್ರೆಗಳು' },
        { era: 'ಹರಪ್ಪಾ', date: 'ಕ್ರಿ.ಪೂ. 2600', title: 'ಹರಪ್ಪಾ ನಾಗರಿಕತೆ', desc: 'ವೇಗದ ಚಕ್ರದ ಕಪ್ಪು-ಕೆಂಪು ಬಣ್ಣದ ಮಡಕೆಗಳು' },
        { era: 'ಬೂದು ಮೃತ್ಪಾತ್ರೆ', date: 'ಕ್ರಿ.ಪೂ. 1200', title: 'ಪಿಜಿಡಬ್ಲ್ಯು', desc: 'ತೆಳುವಾದ ನಯವಾದ ಬೂದುಬಣ್ಣದ ಪಾತ್ರೆಗಳು' },
        { era: 'ಹೊಳೆಯುವ ಕಪ್ಪು', date: 'ಕ್ರಿ.ಪೂ. 600', title: 'ಎನ್‌ಬಿಪಿಡಬ್ಲ್ಯು', desc: 'ಕನ್ನಡಿಯಂತಹ ಲೋಹದ ಹೊಳಪಿನ ಪಾತ್ರೆಗಳು' },
      ],
    },
    objects: {
      en: [
        { name: 'Matka', role: 'Living Chiller', title: 'Matka', desc: 'Micro-pores cool water naturally by 4-8°C' },
        { name: 'Surahi', role: 'Graceful Flask', title: 'Surahi', desc: 'Long neck keeps chilled water fresh & dustless' },
        { name: 'Handi', role: 'Woodfire Pot', title: 'Handi', desc: 'Spherical clay base distributes gentle stew heat' },
        { name: 'Kulhad', role: 'Chai Tumbler', title: 'Kulhad', desc: 'Pure unglazed baked clay with rich aroma' },
      ],
      te: [
        { name: 'మట్టి కుండ (మట్కా)', role: 'సహజ శీతలకరణి', title: 'మట్కా', desc: 'సూక్ష్మ రంధ్రాలతో నీటిని 4-8°C సహజంగా చల్లబరుస్తుంది' },
        { name: 'సురాహి (కూజా)', role: 'సొగసైన కూజా', title: 'సురాహి', desc: 'పొడవైన మెడ నీటిని చల్లగా మరియు స్వచ్ఛంగా ఉంచుతుంది' },
        { name: 'హాండీ (వంట పాత్ర)', role: 'కట్టెలపొయ్యి పాత్ర', title: 'హాండీ', desc: 'గుండ్రని అడుగుభాగం ఆహారాన్ని సమంగా ఉడికిస్తుంది' },
        { name: 'కుల్హడ్ (టీ కప్పు)', role: 'మట్టి కప్పు', title: 'కుల్హడ్', desc: 'సొగసైన మట్టి సువాసనతో కూడిన టీ కప్పు' },
      ],
      hi: [
        { name: 'मटका', role: 'प्राकृतिक कूलर', title: 'मटका', desc: 'सूक्ष्म छिद्रों से पानी को 4-8°C तक ठंडा करता है' },
        { name: 'सुराही', role: 'सुंदर जलपात्र', title: 'सुराही', desc: 'लंबी गर्दन शीतल जल को धूल से सुरक्षित रखती है' },
        { name: 'हांडी', role: 'रसोई का पात्र', title: 'हांडी', desc: 'धीमी आंच पर भोजन को स्वादिष्ट बनाती है' },
        { name: 'कुल्हड़', role: 'मिट्टी का कप', title: 'कुल्हड़', desc: 'सोंधी मिट्टी की सुगंध से युक्त चाय का पात्र' },
      ],
      ta: [
        { name: 'மண்பானை (மட்கா)', role: 'இயற்கை குளிர்விப்பான்', title: 'மட்கா', desc: 'நுண் துளைகள் நீரை 4-8°C வரை குளிர்விக்கின்றன' },
        { name: 'சுராஹி (கூஜா)', role: 'நீண்ட கழுத்துக் குடுவை', title: 'சுராஹி', desc: 'நீண்ட கழுத்து நீரை தூய்மையாகவும் குளிர்ச்சியாகவும் வைக்கும்' },
        { name: 'ஹாண்டி (சமையல் சட்டி)', role: 'மண் சட்டி', title: 'ஹாண்டி', desc: 'உணவை சீராகவும் மெதுவாகவும் வேகவைக்கும்' },
        { name: 'குல்ஹத் (தேநீர் கோப்பை)', role: 'மண் குவளை', title: 'குல்ஹத்', desc: 'மணக்கும் சுடு தேநீருக்கான சுடப்பட்ட மண் கோப்பை' },
      ],
      ml: [
        { name: 'മൺകലം (മട്ക)', role: 'പ്രകൃതിദത്ത കൂളർ', title: 'മട്ക', desc: 'സൂക്ഷ്മ സുഷിരങ്ങളിലൂടെ വെള്ളം തണുപ്പിക്കുന്നു' },
        { name: 'സുരാഹി (കൂജ)', role: 'സുന്ദര കൂജ', title: 'സുരാഹി', desc: 'നീണ്ട കഴുത്ത് തണുത്ത വെള്ളത്തെ സംരക്ഷിക്കുന്നു' },
        { name: 'ഹാൻഡി (ചട്ടി)', role: 'അടുക്കളച്ചട്ടി', title: 'ഹാൻഡി', desc: 'ഭക്ഷണം പതുക്കെ വേവിക്കാൻ ഉത്തമം' },
        { name: 'കുൽഹഡ് (കപ്പ്)', role: 'മൺകപ്പ്', title: 'കുൽഹഡ്', desc: 'മൺമണമുള്ള ചായ ആസ്വദിക്കാൻ അനുയോജ്യം' },
      ],
      kn: [
        { name: 'ಮಡಕೆ (ಮಟ್ಕಾ)', role: 'ನೈಸರ್ಗಿಕ ಶೀತಲಕಾರಿ', title: 'ಮಟ್ಕಾ', desc: 'ಸೂಕ್ಷ್ಮ ರಂಧ್ರಗಳಿಂದ ನೀರನ್ನು 4-8°C ವರೆಗೆ ತಂಪಾಗಿಸುತ್ತದೆ' },
        { name: 'ಸುರಾಹಿ (ಕೂಜಾ)', role: 'ನಾಜೂಕಿನ ಕೂಜಾ', title: 'ಸುರಾಹಿ', desc: 'ಉದ್ದನೆಯ ಕತ್ತು ತಣ್ಣೀರಿಗೆ ಧೂಳು ಬೀಳದಂತೆ ಕಾಪಾಡುತ್ತದೆ' },
        { name: 'ಹಾಂಡಿ (ಅಡುಗೆ ಮಡಕೆ)', role: 'ಅಡುಗೆ ಪಾತ್ರೆ', title: 'ಹಾಂಡಿ', desc: 'ನಿಧಾನವಾಗಿ ಬೇಯಿಸಲು ದುಂಡನೆಯ ಮಣ್ಣಿನ ತಳ' },
        { name: 'ಕುಲ್ಹಡ್ (ಚಹಾ ಕಪ್)', role: 'ಮಣ್ಣಿನ ಕಪ್', title: 'ಕುಲ್ಹಡ್', desc: 'ಮಣ್ಣಿನ ಸುವಾಸನೆಯ ಬಿಸಿ ಚಹಾದ ಲೋಟ' },
      ],
    },
  };

  // Localized headers and notes for cards
  const CARD_HEADINGS: Record<
    string,
    {
      chapterLabel: string;
      storyOfClay: string;
      livingHeritage: string;
      originsTitle: string;
      everydayTitle: string;
      ancientTitle: string;
      objectsTitle: string;
      artisansTitle: string;
      artisansText: string;
      wisdomBadge: string;
      coolingCardTitle: string;
      coolingCardDesc: string;
      studioCardTitle: string;
      studioCardDesc: string;
    }
  > = {
    en: {
      chapterLabel: 'Chapter',
      storyOfClay: 'The Story of Indian Clay',
      livingHeritage: 'Living Cultural Heritage',
      originsTitle: 'The Great Discovery Milestone',
      everydayTitle: 'Clay in Daily Rhythm',
      ancientTitle: 'Archaeological Epochs',
      objectsTitle: 'Everyday Indian Earthenware',
      artisansTitle: 'Living Artisan Communities',
      artisansText: 'Known as Kummara / Kummari in Andhra Pradesh & Telangana, Kumbhar in Maharashtra, Prajapati in North India, and Kuyavar in Tamil Nadu.',
      wisdomBadge: 'Generations of wisdom: touch, sound & smoke reading',
      coolingCardTitle: 'Zero-Energy Earthen Cooling',
      coolingCardDesc: 'Modern architects use terracotta tubes to cool buildings naturally without electricity.',
      studioCardTitle: 'Contemporary Studio Pottery',
      studioCardDesc: 'Designers collaborate with village artisans to create timeless sustainable tableware.',
    },
    te: {
      chapterLabel: 'అధ్యాయం',
      storyOfClay: 'భారతీయ మట్టి మహోన్నత గాథ',
      livingHeritage: 'సజీవ సాంస్కృతిక వారసత్వం',
      originsTitle: 'గొప్ప ఆవిష్కరణ మైలురాళ్ళు',
      everydayTitle: 'నిత్య జీవితంలో మట్టి స్పర్శ',
      ancientTitle: 'పురావస్తు యుగాల ప్రస్థానం',
      objectsTitle: 'నిత్య జీవితంలో భారతీయ మృత్పాత్రలు',
      artisansTitle: 'సజీవ కుమ్మరి వృత్తి సమాజాలు',
      artisansText: 'ఆంధ్రప్రదేశ్ & తెలంగాణలలో కుమ్మరి / కుమ్మరగా, మహారాష్ట్రలో కుంభార్‌గా, ఉత్తర భారతంలో ప్రజాపతిగా, తమిళనాడులో కుయవర్‌గా గౌరవించబడుతున్నారు.',
      wisdomBadge: 'తరతరాల అపార జ్ఞానం: స్పర్శ, నాదం మరియు పొగను చదివే నైపుణ్యం',
      coolingCardTitle: 'విద్యుత్ రహిత సహజ టెర్రకోట శీతలీకరణ',
      coolingCardDesc: 'ఆధునిక వాస్తుశిల్పులు విద్యుత్ లేకుండా భవనాలను చల్లబరచడానికి టెర్రకోట గొట్టాలను ఉపయోగిస్తున్నారు.',
      studioCardTitle: 'సమకాలీన స్టూడియో మృత్కళ',
      studioCardDesc: 'పర్యావరణ హితమైన కళాత్మక పాత్రలను రూపొందించడానికి డిజైనర్లు గ్రామీణ కళాకారులతో కలిసి పనిచేస్తున్నారు.',
    },
    hi: {
      chapterLabel: 'अध्याय',
      storyOfClay: 'भारतीय मिट्टी की महान गाथा',
      livingHeritage: 'जीवंत सांस्कृतिक धरोहर',
      originsTitle: 'महान खोज के ऐतिहासिक चरण',
      everydayTitle: 'दैनिक जीवन की लय में मिट्टी',
      ancientTitle: 'पुरातत्व के ऐतिहासिक कालखंड',
      objectsTitle: 'दैनिक जीवन के पारंपरिक भारतीय बर्तन',
      artisansTitle: 'जीवंत शिल्पी समुदाय',
      artisansText: 'उत्तर भारत में प्रजापति, महाराष्ट्र में कुंभार, आंध्र व तेलंगाना में कुम्मरी तथा तमिलनाडु में कुयवर के रूप में पूजनीय।',
      wisdomBadge: 'पीढ़ियों का अनुभव: स्पर्श, खनक और धुएं को परखने का ज्ञान',
      coolingCardTitle: 'शून्य-ऊर्जा टेराकोटा शीतलन',
      coolingCardDesc: 'आधुनिक वास्तुकार बिना बिजली के इमारतों को प्राकृतिक रूप से ठंडा रखने के लिए टेराकोटा नलियों का उपयोग करते हैं।',
      studioCardTitle: 'समकालीन स्टूडियो पॉटरी',
      studioCardDesc: 'पर्यावरण अनुकूल टिकाऊ बर्तन बनाने के लिए डिज़ाइनर ग्रामीण कारीगरों के साथ मिलकर काम कर रहे हैं।',
    },
    ta: {
      chapterLabel: 'அத்தியாயம்',
      storyOfClay: 'பாரத மண்ணின் பெருங்கதை',
      livingHeritage: 'வாழும் கலாச்சாரப் பாரம்பரியம்',
      originsTitle: 'பெருங்கண்டுபிடிப்பின் மைல்கற்கள்',
      everydayTitle: 'தினசரி வாழ்வில் மண்பாண்டங்கள்',
      ancientTitle: 'தொல்பொருள் வரலாற்று யுகங்கள்',
      objectsTitle: 'அன்றாட பாரத மண்பாண்டங்கள்',
      artisansTitle: 'வாழும் கைவினைக் குயவர் சமூகங்கள்',
      artisansText: 'தமிழ்நாட்டில் குயவர், ஆந்திரா & தெலுங்கானாவில் கும்மரி, மகாராஷ்டிராவில் கும்பா மற்றும் வட இந்தியாவில் பிரஜாபதி என்று அழைக்கப்படுகின்றனர்.',
      wisdomBadge: 'தலைமுறைகளின் ஞானம்: தொடுதல், நாதம் மற்றும் புகையை அறியும் கலை',
      coolingCardTitle: 'மின்சாரமற்ற இயற்கை சுடுமண் குளிரூட்டல்',
      coolingCardDesc: 'மின்சாரம் இன்றி கட்டிடங்களை குளிர்விக்க நவீன வடிவமைப்பாளர்கள் டெரகோட்டா குழாய்களைப் பயன்படுத்துகின்றனர்.',
      studioCardTitle: 'நவீன ஸ்டுடியோ மட்பாண்டக் கலை',
      studioCardDesc: 'நீடித்த நிலைத்தன்மை கொண்ட கலைப் பாத்திரங்களை உருவாக்க வடிவமைப்பாளர்கள் கைவினைஞர்களுடன் இணைந்து செயல்படுகின்றனர்.',
    },
    ml: {
      chapterLabel: 'അധ്യായം',
      storyOfClay: 'ഭാരതീയ മണ്ണിന്റെ ഇതിഹാസം',
      livingHeritage: 'സജീവ സാംസ്കാരിക പൈതൃകം',
      originsTitle: 'മഹത്തായ കണ്ടെത്തലിന്റെ നാഴികക്കല്ലുകൾ',
      everydayTitle: 'ദൈനംദിന ജീവിതത്തിലെ മൺപാത്രങ്ങൾ',
      ancientTitle: 'പുരാവസ്തു ചരിത്ര ഘട്ടങ്ങൾ',
      objectsTitle: 'നിത്യോപയോഗ ഭാരതീയ മൺപാത്രങ്ങൾ',
      artisansTitle: 'സജീവ മൺപാത്ര ശില്പികൾ',
      artisansText: 'കേരളത്തിൽ കുംഭാരൻ, ആന്ധ്രയിലും തെലങ്കാനയിലും കുമ്മരി, മഹാരാഷ്ട്രയിൽ കുംഭാർ, ഉത്തരേന്ത്യയിൽ പ്രജാപതി എന്ന് അറിയപ്പെടുന്നു.',
      wisdomBadge: 'തലമുറകളുടെ ജ്ഞാനം: സ്പർശം, നാദം, പുക തിരിച്ചറിയൽ',
      coolingCardTitle: 'വൈദ്യുതി ആവശ്യമില്ലാത്ത പ്രകൃതിദത്ത തണുപ്പ്',
      coolingCardDesc: 'കെട്ടിടങ്ങൾ പ്രകൃതിദത്തമായി തണുപ്പിക്കാൻ ആധുനിക ആർക്കിടെക്റ്റുകൾ ടെറാക്കോട്ട ട്യൂബുകൾ ഉപയോഗിക്കുന്നു.',
      studioCardTitle: 'സമകാലിക സ്റ്റുഡിയോ മൺപാത്രകല',
      studioCardDesc: 'പരിസ്ഥിതി സൗഹൃദ പാത്രങ്ങൾ നിർമ്മിക്കാൻ ഡിസൈനർമാർ ഗ്രാമീണ ശില്പികളുമായി സഹകരിക്കുന്നു.',
    },
    kn: {
      chapterLabel: 'ಅಧ್ಯಾಯ',
      storyOfClay: 'ಭಾರತೀಯ ಮಣ್ಣಿನ ಮಹಾನ್ ಕಥೆ',
      livingHeritage: 'ಜೀವಂತ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ',
      originsTitle: 'ಮಹಾನ್ ಅನ್ವೇಷಣೆಯ ಮೈಲಿಗಲ್ಲುಗಳು',
      everydayTitle: 'ದೈನಂದಿನ ಬದುಕಿನಲ್ಲಿ ಮಣ್ಣಿನ ಸಂಗ',
      ancientTitle: 'ಪುರಾತತ್ವ ಇತಿಹಾಸದ ಯುಗಗಳು',
      objectsTitle: 'ದೈನಂದಿನ ಭಾರತೀಯ ಮಣ್ಣಿನ ಪಾತ್ರೆಗಳು',
      artisansTitle: 'ಜೀವಂತ ಕುಂಬಾರ ಸಮುದಾಯಗಳು',
      artisansText: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಕುಂಬಾರ, ಆಂಧ್ರ-ತೆಲಂಗಾಣದಲ್ಲಿ ಕುಮ್ಮರಿ, ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಕುಂಭಾರ್, ಉತ್ತರ ಭಾರತದಲ್ಲಿ ಪ್ರಜಾಪತಿ ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ.',
      wisdomBadge: 'ತಲೆಮಾರುಗಳ ಜ್ಞಾನ: ಸ್ಪರ್ಶ, ನಾದ ಮತ್ತು ಹೊಗೆ ಗುರುತಿಸುವ ಕಲೆ',
      coolingCardTitle: 'ವಿದ್ಯುತ್ ರಹಿತ ನೈಸರ್ಗಿಕ ಟೆರ್ರಾಕೋಟಾ ತಂಪಾಗಿಸುವಿಕೆ',
      coolingCardDesc: 'ವಿದ್ಯುತ್ ಇಲ್ಲದೆ ಕಟ್ಟಡಗಳನ್ನು ತಂಪಾಗಿರಿಸಲು ಆಧುನಿಕ ವಾಸ್ತುಶಿಲ್ಪಿಗಳು ಟೆರ್ರಾಕೋಟಾ ಕೊಳವೆಗಳನ್ನು ಬಳಸುತ್ತಿದ್ದಾರೆ.',
      studioCardTitle: 'ಸಮಕಾಲೀನ ಸ್ಟುಡಿಯೋ ಕುಂಬಾರಿಕೆ',
      studioCardDesc: 'ಪರಿಸರಸ್ನೇಹಿ ಸುಸ್ಥಿರ ಪಾತ್ರೆಗಳನ್ನು ರೂಪಿಸಲು ವಿನ್ಯಾಸಕರು ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳೊಂದಿಗೆ ಕೈಜೋಡಿಸುತ್ತಿದ್ದಾರೆ.',
    },
  };

  const activeLang = language || 'en';
  const headings = CARD_HEADINGS[activeLang] || CARD_HEADINGS.en;

  // Render varied visual feature cards depending on the chapter topic
  const renderChapterVisualFeature = () => {
    switch (section.id) {
      case 'before-pottery': {
        const items = CHAPTER_VISUALS['before-pottery'][activeLang] || CHAPTER_VISUALS['before-pottery'].en;
        return (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mt-4">
            {items.map((item) => (
              <div
                key={item.title}
                className="group text-left rounded-2xl border border-white/10 bg-black/40 p-3 shadow-lg transition-all duration-300 hover:border-[#E5A344] hover:bg-black/60 hover:-translate-y-0.5"
              >
                <span className="text-[10px] font-mono font-bold uppercase text-[#E5A344]">
                  {item.tag}
                </span>
                <p className="font-display text-sm font-bold text-[#FAF5F0] mt-0.5 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#D8C7B8] leading-tight mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        );
      }

      case 'origins': {
        const items = CHAPTER_VISUALS['origins'][activeLang] || CHAPTER_VISUALS['origins'].en;
        return (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-2.5">
              {headings.originsTitle}
            </p>
            <div className="space-y-3">
              {items.map((s) => (
                <div key={s.step} className="flex items-start gap-3 text-xs">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B8582B]/30 border border-[#E5A344]/40 font-mono text-xs font-bold text-amber-300">
                    {s.step}
                  </span>
                  <div>
                    <span className="font-bold text-[#FAF5F0]">{s.title}: </span>
                    <span className="text-[#D8C7B8] leading-relaxed">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'everyday-life': {
        const items = CHAPTER_VISUALS['everyday-life'][activeLang] || CHAPTER_VISUALS['everyday-life'].en;
        return (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3">
            <p className="text-xs font-mono font-semibold text-[#E5A344] uppercase tracking-wider">
              {headings.everydayTitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {items.map((item) => (
                <div
                  key={item.season}
                  className="text-left rounded-xl border border-white/10 bg-black/30 p-3 transition-all hover:border-[#E5A344] hover:bg-black/50"
                >
                  <p className="font-display font-bold text-amber-300">{item.season}</p>
                  <p className="text-[11px] text-[#D8C7B8] mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'ancient-india': {
        const items = CHAPTER_VISUALS['ancient-india'][activeLang] || CHAPTER_VISUALS['ancient-india'].en;
        return (
          <div className="mt-4 space-y-2.5">
            <p className="text-xs font-mono font-semibold text-[#E5A344] uppercase tracking-wider">
              {headings.ancientTitle}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {items.map((item) => (
                <div
                  key={item.era}
                  className="group rounded-xl border border-white/10 bg-black/40 p-2.5 text-left transition-all hover:border-[#E5A344] hover:bg-black/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-amber-300 group-hover:text-amber-200">
                      {item.title || item.era}
                    </span>
                    <span className="text-[10px] font-mono text-[#D8C7B8]/70">{item.date}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#D8C7B8] leading-tight line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'objects': {
        const items = CHAPTER_VISUALS['objects'][activeLang] || CHAPTER_VISUALS['objects'].en;
        return (
          <div className="mt-4 space-y-2.5">
            <p className="text-xs font-mono font-semibold text-[#E5A344] uppercase tracking-wider">
              {headings.objectsTitle}
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="group rounded-xl border border-white/10 bg-black/40 p-2.5 text-left transition-all hover:border-[#E5A344] hover:bg-black/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-[#FAF5F0] group-hover:text-amber-300">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#E5A344]">{item.role}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#D8C7B8] leading-tight line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'living-traditions':
        return (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs font-mono font-semibold text-[#E5A344] uppercase tracking-wider mb-2">
              {headings.artisansTitle}
            </p>
            <p className="text-xs text-[#D8C7B8] leading-relaxed">
              {headings.artisansText}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-amber-200 bg-[#B8582B]/20 border border-[#E5A344]/30 p-2.5 rounded-xl">
              <Heart className="h-4 w-4 text-[#E5A344] shrink-0" />
              <span>{headings.wisdomBadge}</span>
            </div>
          </div>
        );

      case 'today-tomorrow':
        return (
          <div className="mt-4 space-y-2.5">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex items-start gap-3">
              <Leaf className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-display text-sm font-bold text-[#FAF5F0]">{headings.coolingCardTitle}</p>
                <p className="text-xs text-[#D8C7B8] mt-0.5">
                  {headings.coolingCardDesc}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-display text-sm font-bold text-[#FAF5F0]">{headings.studioCardTitle}</p>
                <p className="text-xs text-[#D8C7B8] mt-0.5">
                  {headings.studioCardDesc}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      id={section.id}
      className={`scroll-mt-24 border-b border-[#B8582B]/20 py-5 sm:py-8 lg:py-14 transition-colors ${
        isEven
          ? 'bg-gradient-to-b from-[#0d0a08] via-[#120e0b] to-[#0d0a08]'
          : 'bg-gradient-to-b from-[#0f0c09] via-[#15100c] to-[#0f0c09]'
      } text-[#FAF5F0]`}
      aria-labelledby={`heading-${section.id}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-3xl border border-[#B8582B]/35 bg-gradient-to-b from-[#181310]/95 to-[#1c1511]/95 p-4 sm:p-6 lg:p-10 shadow-2xl backdrop-blur-xl"
        >
          {/* Top Chapter Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center rounded-lg bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-4 py-1.5 font-mono text-xs sm:text-sm font-extrabold text-white tracking-wider uppercase shadow-lg">
                {headings.chapterLabel} {section.number}
              </span>
              <span className="font-mono text-xs sm:text-sm text-[#E5A344] uppercase tracking-wider font-bold">
                {headings.storyOfClay}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#D8C7B8]">
              <Compass className="h-3.5 w-3.5 text-[#E5A344]" />
              <span>{headings.livingHeritage}</span>
            </div>
          </div>

          {/* Main Story Content Grid */}
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-11">
            {/* Left Column: Narrative (7 cols) */}
            <div className="lg:col-span-7">
              <h2
                id={`heading-${section.id}`}
                className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-[#FAF5F0] leading-[1.12]"
              >
                {section.title}
              </h2>

              <p className="mt-2.5 font-sans text-lg sm:text-xl text-[#E5A344] font-bold">
                {section.subtitle}
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#D8C7B8]">
                {section.description}
              </p>

              {/* Fascinating Fact / Student Learning Box */}
              <div className="mt-6 rounded-2xl border-l-4 border-[#E5A344] border-t border-r border-b border-white/10 bg-black/40 p-4.5 sm:p-5 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#E5A344]">
                  <Lightbulb className="h-4 w-4 text-[#F59E0B] animate-pulse" />
                  <span>{ui.general.didYouKnow}</span>
                </div>
                <p className="mt-2 font-sans text-sm sm:text-base text-[#FAF5F0] leading-relaxed">
                  {section.fascinatingFact}
                </p>
              </div>
            </div>

            {/* Right Column: Visual Topic Features & Next Navigation (5 cols) */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-5 lg:col-span-5 backdrop-blur-md">
              <div>
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#E5A344]">
                  {ui.general.exploreTopic}
                </p>

                {/* Chapter-Specific Custom Visual Component */}
                {renderChapterVisualFeature()}

                {/* Topic tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {section.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-medium text-[#D8C7B8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step Forward to Next Chapter */}
              {onNavigateNext && nextSectionLabel && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      onNavigateNext();
                    }}
                    className="inline-flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#B8582B] via-[#D86D3D] to-[#E5A344] px-4 py-3 text-xs font-bold text-white shadow-lg transition-all hover:scale-102 active:scale-98"
                    aria-label={`Continue to next chapter: ${nextSectionLabel}`}
                  >
                    <span>{ui.general.nextChapter}: {nextSectionLabel}</span>
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Embedded Interactive Chapter Demonstrations */}
          {renderInteractiveChapterBody()}
        </motion.div>
      </div>
    </section>
  );
};
