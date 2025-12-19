import Link from "next/link";
import { Container } from "./components/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="pt-24 lg:pt-32 min-h-screen flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 text-gray-900">
            404
          </h1>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-teal to-teal-dark hover:from-teal-dark hover:to-teal text-white text-lg px-8 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Go Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-teal text-gray-700 hover:text-teal hover:bg-teal/5 text-lg px-8 py-7 rounded-full transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

