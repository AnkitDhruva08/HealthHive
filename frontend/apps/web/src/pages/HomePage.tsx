import { useState, useEffect } from "react";
import { 
  HeartPulse, 
  Stethoscope, 
  Shield, 
  Zap,
  MapPin,
  Star,
  Play,
  CheckCircle,
  AlertTriangle,
  Brain,
  Truck,
  Eye,
  Activity,
  Phone,
  Lock
} from "lucide-react";

const HomePage = ()  => {
  const [isVisible, setIsVisible] = useState(false);
  const [riskLevel, setRiskLevel] = useState<'green' | 'yellow' | 'red'>('green');
  const [activeDemo, setActiveDemo] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    // Demo risk level cycling
    const interval = setInterval(() => {
      const levels: Array<'green' | 'yellow' | 'red'> = ['green', 'yellow', 'red'];
      setRiskLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const riskColors = {
    green: 'from-green-400 to-emerald-500',
    yellow: 'from-yellow-400 to-orange-500',
    red: 'from-red-400 to-pink-500'
  };

  const stats = [
    { number: "< 2min", label: "Emergency Response Time" },
    { number: "24/7", label: "AI Health Monitoring" },
    { number: "99.9%", label: "Doctor Availability" },
    { number: "HIPAA", label: "Compliant Security" }
  ];

  const demoSteps = [
    {
      title: "AI Detects Anomaly",
      description: "Smartwatch sensors detect irregular heart rate and low SpO2",
      icon: <Brain className="w-8 h-8" />,
      status: "Critical vitals detected"
    },
    {
      title: "Doctor Verification",
      description: "Nearest verified doctor receives real-time dashboard alert",
      icon: <Stethoscope className="w-8 h-8" />,
      status: "Dr. Smith notified - 0.3km away"
    },
    {
      title: "Instant Response",
      description: "Doctor confirms emergency and dispatches care or medicine",
      icon: <Zap className="w-8 h-8" />,
      status: "Emergency response initiated"
    },
    {
      title: "Care Delivered",
      description: "Ambulance dispatched or medicine delivered within minutes",
      icon: <Truck className="w-8 h-8" />,
      status: "Help arriving in 4 minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Medical Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/20 to-red-900/10" />
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-green-400 rounded-full animate-ping" />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping delay-1000" />
        {/* EKG-like lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <path d="M0,200 L200,200 L220,100 L240,300 L260,150 L280,200 L1000,200" 
                  stroke="currentColor" strokeWidth="1" fill="none" className="text-green-400 animate-pulse" />
          </svg>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 lg:px-12 py-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <HeartPulse className={`w-10 h-10 text-red-400 transition-all duration-1000 ${riskLevel === 'red' ? 'animate-pulse' : ''}`} />
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full animate-ping transition-colors duration-1000 bg-gradient-to-r ${riskColors[riskLevel]}`} />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
            HealthHive
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${riskColors[riskLevel]} transition-all duration-1000`}>
            {riskLevel.toUpperCase()}
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-red-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-red-400 transition-colors">How it Works</a>
          <a href="#technology" className="hover:text-red-400 transition-colors">Technology</a>
        </div>
        <button className="bg-gradient-to-r from-red-500 to-purple-600 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-red-500/25 transition-all">
          Emergency Demo
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <span className="text-sm">AI-Powered Emergency Response Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-red-300 to-purple-300 bg-clip-text text-transparent">
                Life-Saving AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                Health Guardian
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              The only platform that <strong className="text-red-400">detects, verifies, and acts</strong> on medical emergencies automatically — 
              from AI health tracking to verified doctor intervention and medicine delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="group bg-gradient-to-r from-red-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all transform hover:scale-105">
                <span className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Start Monitoring</span>
                </span>
              </button>
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all">
                <span className="flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Emergency Demo</span>
                </span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Emergency Response in Action
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Watch how HealthHive detects and responds to medical emergencies in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {demoSteps.map((step, index) => (
              <div 
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-500 ${
                  activeDemo >= index ? 'border-red-500/50 bg-red-500/10' : 'border-white/10'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 bg-gradient-to-br transition-all duration-500 ${
                  activeDemo >= index ? 'from-red-500 to-purple-600' : 'from-gray-600 to-gray-700'
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                {activeDemo >= index && (
                  <div className="text-red-400 text-xs font-semibold animate-pulse">
                    {step.status}
                  </div>
                )}
                {activeDemo >= index && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button 
              onClick={() => setActiveDemo((prev) => (prev + 1) % (demoSteps.length + 1))}
              className="bg-gradient-to-r from-red-500 to-purple-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Simulate Emergency ({activeDemo}/{demoSteps.length})
            </button>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section id="features" className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                What Makes HealthHive Unique
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The only platform combining continuous AI monitoring, doctor verification, and instant emergency response
            </p>
          </div>

          {/* Main Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Brain className="w-12 h-12" />,
                title: "AI Risk Grading",
                description: "Smart algorithms categorize health status as Green (Normal), Yellow (Warning), or Red (Critical) in real-time",
                gradient: "from-green-400 via-yellow-400 to-red-500",
                unique: "Only platform with adaptive health baselines"
              },
              {
                icon: <Eye className="w-12 h-12" />,
                title: "Doctor Verification",
                description: "Licensed doctors verify every AI alert before action - ensuring accuracy and preventing false alarms",
                gradient: "from-blue-400 to-cyan-500",
                unique: "Human-AI hybrid approach for safety"
              },
              {
                icon: <MapPin className="w-12 h-12" />,
                title: "Geo-Based Dispatch",
                description: "Uber-style system connecting you with nearest verified doctors, paramedics, or emergency services",
                gradient: "from-purple-400 to-pink-500",
                unique: "Freelance doctor network like Ola/Rapido"
              }
            ].map((card, index) => (
              <div 
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.gradient} mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">{card.description}</p>
                <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">{card.unique}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Competitive Advantage Grid */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Why HealthHive Wins</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Activity />, title: "Continuous AI Monitoring", competitors: "❌ Apple Watch, Practo" },
                { icon: <AlertTriangle />, title: "AI Risk Grading", competitors: "❌ All competitors" },
                { icon: <Stethoscope />, title: "Doctor Verification", competitors: "❌ Apple, Fitbit" },
                { icon: <Truck />, title: "Geo-Based Doctor Dispatch", competitors: "❌ All healthcare apps" },
                { icon: <Lock />, title: "Edge + Cloud AI Privacy", competitors: "❌ Most platforms" },
                { icon: <Phone />, title: "Silent Health Check-ins", competitors: "❌ All competitors" },
                { icon: <CheckCircle />, title: "Detection to Delivery", competitors: "❌ Requires multiple apps" },
                { icon: <Shield />, title: "HIPAA + GDPR Compliant", competitors: "⚠️ Most are cloud-only" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-purple-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-400">{feature.competitors}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-10 px-6 lg:px-12 py-20 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Advanced Technology Stack
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Edge + Cloud AI Architecture</h3>
              <div className="space-y-4">
                {[
                  { label: "Edge AI Processing", desc: "Real-time analysis on your device for privacy" },
                  { label: "Cloud AI Intelligence", desc: "Advanced pattern recognition without exposing raw data" },
                  { label: "Hybrid Security Model", desc: "HIPAA/GDPR compliance with minimal data exposure" },
                  { label: "Real-time Sync", desc: "WebSocket connections for instant doctor alerts" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-red-400 rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-red-400">{item.label}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold">Tech Stack</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Frontend:</strong> React Native</div>
                <div><strong>Backend:</strong> Python FastAPI</div>
                <div><strong>AI/ML:</strong> TensorFlow, PyTorch</div>
                <div><strong>Database:</strong> PostgreSQL, Redis</div>
                <div><strong>Cloud:</strong> AWS HIPAA Services</div>
                <div><strong>Integrations:</strong> Fitbit, Apple Health</div>
                <div><strong>Video:</strong> WebRTC, Twilio</div>
                <div><strong>Delivery:</strong> Ola/Rapido APIs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-red-500/10 to-purple-600/10 backdrop-blur-sm border border-red-500/20 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                Your Life Deserves Protection
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the revolution in emergency healthcare. Because every second counts when it matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="bg-gradient-to-r from-red-500 to-purple-600 px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all">
                Schedule Emergency Demo
              </button>
            </div>
            <p className="text-sm text-gray-400">
              MVP launching in 6 months • ₹22,000-29,000 development budget • Pilot testing available
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <HeartPulse className="w-8 h-8 text-red-400" />
              <span className="text-xl font-bold">HealthHive</span>
              <span className="text-sm text-gray-400">Life-Saving AI Guardian</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Emergency Support</a>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-8 pt-8 border-t border-white/10">
            © 2025 HealthHive by Ankit Mishra. Saving lives through AI-powered emergency response.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;