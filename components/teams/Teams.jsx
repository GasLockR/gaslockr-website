import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TwitterLogoIcon,
  DiscordLogoIcon,
  LinkedInLogoIcon
} from "@radix-ui/react-icons"

const Teams = () => {
  const teamMembers = [
    {
      title: "John Doe",
      avatar: "https://github.com/shadcn.png",
      position: "Software Engineer",
      description:
        "John is a software engineer with over 5 years of experience.",
      email: "john.doe@example.com"
    },
    {
      title: "John Doe",
      avatar: "https://github.com/shadcn.png",
      position: "Software Engineer",
      description:
        "John is a software engineer with over 5 years of experience.",
      email: "john.doe@example.com"
    },
    {
      title: "John Doe",
      avatar: "https://github.com/shadcn.png",
      position: "Software Engineer",
      description:
        "John is a software engineer with over 5 years of experience.",
      email: "john.doe@example.com"
    }
  ]

  return (
    <div className="p-14">
      <p className="p-4 font-bold text-3xl">Meet Our Team</p>
      <p className="p-4 text-1xl">
        Our founding team comes from top academic institutions around the world
        and has extensive experience in the Web3 field.
      </p>
      <div className="flex justify-between">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-1/3 p-4">
            <Card className="w-[350px] h-[230px] hover:text-sky-600 hover:border-sky-600">
              <CardHeader>
                <CardTitle>
                  <div className="flex flex-row gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt="teammember" />
                      <AvatarFallback>{member.title}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <p className="">{member.title}</p>
                      <p className=" text-base">{member.position}</p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>{member.description}</CardContent>
              <CardFooter className="flex flex-row justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <TwitterLogoIcon />
                </Button>
                <Button variant="ghost" size="icon">
                  <DiscordLogoIcon />
                </Button>
                <Button variant="ghost" size="icon">
                  <LinkedInLogoIcon />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams
