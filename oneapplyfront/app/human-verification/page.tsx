import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function HumanVerification() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-orange-500">Let's confirm you are human</h2>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Complete the security check before continuing. This step verifies that you are not a bot, which helps to
              protect your account and prevent spam.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 dark:bg-[#1a2337] dark:border-[#292929] p-8 rounded-lg shadow-md max-w-md w-full">
            <div className="flex justify-center">
              {/* This would be replaced with an actual CAPTCHA component in a real implementation */}
              <div className="border border-gray-300 dark:border-gray-700 rounded-md p-6 w-full h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-800/50">
                <p className="text-gray-500 dark:text-gray-400">CAPTCHA would appear here</p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Begin →
              </Button>

              <div className="flex justify-center">
                <select className="block w-32 rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-300">
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

