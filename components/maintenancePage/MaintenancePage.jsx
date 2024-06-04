import { Container } from "@/components/Container"
import React from "react"

const MaintenancePage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-200 mb-4">
          We are currently undergoing maintenance
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Our team is working hard to improve your experience. We will be back
          shortly. Thank you for your patience!
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Meanwhile, you can visit our
          <a
            href="https://gaslockr.gitbook.io/gaslockr"
            className="text-[#159895] underline"
          >
            documentation
          </a>
          or follow us on
          <a
            href="https://twitter.com/gaslockr"
            className="text-[#159895] underline"
          >
            Twitter
          </a>
          for updates.
        </p>
        <div className="flex space-x-4">
          <a
            href="/"
            className="bg-[#57C5B6] text-white py-2 px-4 rounded transform hover:scale-105 hover:bg-[#159895]"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </Container>
  )
}

export default MaintenancePage
