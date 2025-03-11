import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reset your password</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Create a new password for your account</p>
          </div>

          <form
            className="space-y-6 bg-gray-50 border border-gray-200 dark:bg-[#1a2337] p-6 rounded-lg shadow-sm dark:shadow-none dark:border dark:border-[#292929]"
            action="#"
            method="POST"
          >
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  placeholder="New password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm new password
                </label>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="mt-1"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-primary dark:bg-[#1E88E5] hover:bg-primary/90 dark:hover:bg-[#1565C0] text-white dark:text-[#E0E0E0]"
              >
                Reset password
              </Button>
            </div>
          </form>

          <div className="text-center">
            <Link
              href="/sign-in"
              className="font-medium text-primary dark:text-[#64B5F6] hover:text-primary/90 dark:hover:text-[#64B5F6]/90"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

