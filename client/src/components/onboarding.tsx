import { useEffect, useState } from "react";
import { RotateCcw, Calendar, UtensilsCrossed, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ONBOARDING_KEY = "dr_onboarding_done";

const slides: Slide[] = [
  {
    id: 1,
    title: "Spin the Rolls",
    description: "Let the dinner rolls pick dinner for you! Get personalized meal suggestions based on your family's preferences and dietary needs.",
    icon: <RotateCcw className="w-16 h-16 text-amber-400" />,
  },
  {
    id: 2,
    title: "Track & Plan",
    description: "Track your meal history, plan meals for the week, and create custom family profiles. Keep everyone's preferences organized in one place.",
    icon: <Calendar className="w-16 h-16 text-amber-400" />,
  },
  {
    id: 3,
    title: "Cook or Order",
    description: "Choose to cook your favorite recipes at home or order from partner restaurants. Get delivery links and cooking instructions all in one app.",
    icon: <UtensilsCrossed className="w-16 h-16 text-amber-400" />,
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already completed onboarding
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    if (hasCompletedOnboarding) {
      setIsVisible(false);
    }
  }, []);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const handleGetStarted = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-900/95 backdrop-blur-sm"
      data-testid="overlay-onboarding"
    >
      <div className="w-full max-w-md mx-4">
        <div
          className="bg-stone-800 border border-stone-700 rounded-2xl p-8 flex flex-col items-center gap-6"
          data-testid={`card-slide-${slide.id}`}
        >
          {/* Icon */}
          <div className="flex justify-center" data-testid={`icon-slide-${slide.id}`}>
            {slide.icon}
          </div>

          {/* Title */}
          <h2
            className="text-2xl font-bold text-white text-center"
            data-testid={`heading-slide-${slide.id}`}
          >
            {slide.title}
          </h2>

          {/* Description */}
          <p
            className="text-stone-300 text-center text-sm leading-relaxed"
            data-testid={`text-description-${slide.id}`}
          >
            {slide.description}
          </p>

          {/* Navigation Dots */}
          <div
            className="flex gap-2 justify-center"
            data-testid="container-dots"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-amber-400 w-6"
                    : "bg-stone-600 w-2"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                data-testid={`button-dot-${index}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full pt-2">
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="flex-1 text-stone-300 border-stone-600"
              data-testid="button-skip"
            >
              {isLastSlide ? "Skip" : "Skip"}
            </Button>
            <Button
              onClick={isLastSlide ? handleGetStarted : handleNext}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold"
              data-testid={isLastSlide ? "button-get-started" : "button-next"}
            >
              {isLastSlide ? "Get Started" : "Next"}
              {!isLastSlide && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
