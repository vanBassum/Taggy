import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-4 text-center">
        <h1 className="text-3xl font-semibold">Taggy</h1>
        <p className="text-muted-foreground">
          Create a short tag and share it as taggy.me/v/&lt;tag&gt;.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium"
            to="/edit"
          >
            Create tag
          </Link>
          <Link
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium"
            to="/?n=John+Doe&e=john%40gmail.com&p=%2B123456789&c=US"
          >
            View demo
          </Link>
        </div>
      </div>
    </div>
  )
}
