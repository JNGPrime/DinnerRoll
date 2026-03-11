import { ArrowLeft, Shield, AlertTriangle, FileText, Lock, Scale } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Legal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <a href="/" data-testid="link-legal-back">
          <div className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-6 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to DinnerRoll</span>
          </div>
        </a>

        <h1 className="text-3xl font-bold mb-2" data-testid="text-legal-title">Legal Information</h1>
        <p className="text-stone-400 mb-8">Last updated: February 2026</p>

        <div className="space-y-8">

          <Card className="bg-red-950/40 border-red-800/50 p-6" data-testid="section-allergy-disclaimer">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-red-300">Allergy & Dietary Disclaimer</h2>
            </div>
            <div className="space-y-3 text-stone-300 text-sm leading-relaxed">
              <p className="font-semibold text-red-300">
                IMPORTANT: DinnerRoll is NOT a medical or dietary advisory service.
              </p>
              <p>
                The recipes, meal suggestions, nutritional information, and dietary classifications provided by DinnerRoll are for general informational and entertainment purposes only. They are not intended as medical advice, nutritional counseling, or dietary guidance.
              </p>
              <p>
                <strong className="text-white">Allergen Warning:</strong> Recipes and meal suggestions may contain or come into contact with common allergens including but not limited to: milk, eggs, wheat, soy, tree nuts, peanuts, fish, shellfish, sesame, and gluten. We do not guarantee that any recipe or meal is free from allergens.
              </p>
              <p>
                <strong className="text-white">Nutritional Information:</strong> All calorie counts, macronutrient data (protein, carbs, fat, fiber, sodium), and serving size estimates are approximations only. Actual nutritional values may vary based on specific ingredients used, preparation methods, portion sizes, and brand variations.
              </p>
              <p>
                <strong className="text-white">Dietary Filters:</strong> While we provide dietary filters (vegetarian, vegan, etc.), we cannot guarantee the accuracy of dietary classifications. Always verify ingredients against your specific dietary requirements before preparing or consuming any meal.
              </p>
              <p>
                <strong className="text-white">Restaurant Information:</strong> Menu items, prices, availability, and nutritional information for restaurants listed in the app may change without notice. We are not responsible for the accuracy of third-party restaurant data.
              </p>
              <p className="font-semibold text-red-300">
                If you have food allergies, intolerances, or medical dietary restrictions, always consult with a qualified healthcare professional or allergist before trying new foods or recipes. DinnerRoll, its creators, developers, and affiliates assume NO LIABILITY for any allergic reactions, adverse health effects, or dietary issues arising from the use of this application.
              </p>
            </div>
          </Card>

          <Card className="bg-stone-800/60 border-stone-700/50 p-6" data-testid="section-terms">
            <div className="flex items-start gap-3 mb-4">
              <FileText className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-amber-300">Terms of Service</h2>
            </div>
            <div className="space-y-3 text-stone-300 text-sm leading-relaxed">
              <p>
                By accessing and using DinnerRoll ("the App"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the App.
              </p>
              <h3 className="text-white font-semibold pt-2">1. Service Description</h3>
              <p>
                DinnerRoll is a dinner decision assistance tool that provides meal suggestions, recipe ideas, restaurant recommendations, and pantry management features. The App is designed for entertainment and convenience purposes.
              </p>
              <h3 className="text-white font-semibold pt-2">2. User Accounts & Subscriptions</h3>
              <p>
                Some features may require a subscription. Subscription prices are selected by the user at the time of purchase. All payments are processed securely through Stripe. Subscriptions are billed monthly and can be cancelled at any time. Refunds are subject to our refund policy.
              </p>
              <h3 className="text-white font-semibold pt-2">3. Acceptable Use</h3>
              <p>
                You agree to use DinnerRoll only for its intended purpose. You may not attempt to reverse-engineer, copy, or redistribute the App or its content without written permission.
              </p>
              <h3 className="text-white font-semibold pt-2">4. User-Generated Content</h3>
              <p>
                If you add custom restaurants, pantry items, or other content, you retain ownership of that data. However, you grant DinnerRoll a license to store and display that content within the App for your use.
              </p>
              <h3 className="text-white font-semibold pt-2">5. Limitation of Liability</h3>
              <p>
                DinnerRoll is provided "as is" without warranties of any kind, either express or implied. We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the App, including but not limited to health issues, food allergies, incorrect nutritional data, or restaurant availability.
              </p>
              <h3 className="text-white font-semibold pt-2">6. Third-Party Services</h3>
              <p>
                The App may contain links to third-party services including Uber Eats, DoorDash, Grubhub, H-E-B, Kroger, and Favor. These links are provided for convenience. DinnerRoll is not affiliated with, endorsed by, or responsible for the services, content, or practices of these third-party platforms.
              </p>
              <h3 className="text-white font-semibold pt-2">7. Modifications</h3>
              <p>
                We reserve the right to modify these terms at any time. Continued use of the App after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </Card>

          <Card className="bg-stone-800/60 border-stone-700/50 p-6" data-testid="section-privacy">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-amber-300">Privacy Policy</h2>
            </div>
            <div className="space-y-3 text-stone-300 text-sm leading-relaxed">
              <h3 className="text-white font-semibold">Information We Collect</h3>
              <p>
                DinnerRoll may collect the following information: account login details (managed by our authentication provider), family size preferences, dietary preferences, pantry inventory data, barcode scan data, favorite restaurants, and subscription/payment information (processed by Stripe).
              </p>
              <h3 className="text-white font-semibold pt-2">How We Use Your Information</h3>
              <p>
                Your data is used exclusively to provide and improve the DinnerRoll experience, including personalized meal recommendations, pantry tracking, recipe matching, and subscription management. We do not sell your personal data to third parties.
              </p>
              <h3 className="text-white font-semibold pt-2">Data Storage</h3>
              <p>
                Your data is stored securely on our servers. Pantry and preference data may also be stored locally on your device for offline access. Payment information is handled entirely by Stripe and is never stored on our servers.
              </p>
              <h3 className="text-white font-semibold pt-2">Cookies & Local Storage</h3>
              <p>
                The App uses local storage and cookies to maintain your session, save preferences, and improve performance. By using the App, you consent to the use of these technologies.
              </p>
              <h3 className="text-white font-semibold pt-2">AI-Powered Features</h3>
              <p>
                DinnerRoll uses AI (OpenAI) for pantry photo scanning. Photos submitted for AI analysis are processed in real-time and are not permanently stored. We do not use your photos for AI model training.
              </p>
              <h3 className="text-white font-semibold pt-2">Your Rights</h3>
              <p>
                You may request deletion of your account and associated data at any time by contacting us. You can clear your locally stored data through your browser settings.
              </p>
            </div>
          </Card>

          <Card className="bg-stone-800/60 border-stone-700/50 p-6" data-testid="section-disclaimer">
            <div className="flex items-start gap-3 mb-4">
              <Scale className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-amber-300">General Disclaimer</h2>
            </div>
            <div className="space-y-3 text-stone-300 text-sm leading-relaxed">
              <p>
                DinnerRoll is an entertainment and convenience application designed to help with dinner decisions. It is not a substitute for professional nutritional advice, medical guidance, or dietary counseling.
              </p>
              <p>
                <strong className="text-white">No Guarantee of Accuracy:</strong> While we strive to provide accurate recipe information, nutritional data, and restaurant details, we make no warranties about the completeness, reliability, or accuracy of this information.
              </p>
              <p>
                <strong className="text-white">Recipe Safety:</strong> Users are responsible for ensuring food safety practices when preparing any recipes suggested by the App, including proper cooking temperatures, food handling, and storage.
              </p>
              <p>
                <strong className="text-white">Children's Use:</strong> This App is intended for use by adults or under adult supervision. Parents and guardians are responsible for monitoring the dietary choices made using this App for their children.
              </p>
              <p>
                <strong className="text-white">Indemnification:</strong> By using DinnerRoll, you agree to indemnify and hold harmless DinnerRoll, its owners, operators, developers, and affiliates from any claims, losses, damages, liabilities, or expenses arising out of your use of the App.
              </p>
            </div>
          </Card>

          <Card className="bg-stone-800/60 border-stone-700/50 p-6" data-testid="section-contact">
            <div className="flex items-start gap-3 mb-4">
              <Shield className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <h2 className="text-xl font-bold text-amber-300">Contact Us</h2>
            </div>
            <div className="text-stone-300 text-sm leading-relaxed">
              <p>
                If you have questions about these legal notices, our privacy practices, or need to report an issue, please contact us through the app. We take your concerns seriously and will respond promptly.
              </p>
            </div>
          </Card>

        </div>

        <div className="text-center text-stone-500 text-xs mt-12 mb-8 space-y-1">
          <p>DinnerRoll - Dinner decisions, handled.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
