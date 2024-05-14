import React from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const GasInsureList = () => {
  return (
    <>
      <Card className=" w-full h-full flex items-center justify-center">
        <div className="bg-white h-full w-full">
          <Tabs defaultValue="account" className="w-full p-2">
            <TabsList>
              <TabsTrigger value="current">Current</TabsTrigger>
              <TabsTrigger value="finished">Finished</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
              <Table>
                <TableCaption>A list of your current policy.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Block</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Claim status</TableHead>
                    <TableHead className="text-center">-</TableHead>
                    <TableHead>Points</TableHead>

                    <TableHead className="text-right">High Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell className="w-[100px]">003-004</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>$10,000</TableCell>
                    <TableCell>yes</TableCell>
                    <TableCell className="text-center">
                      <Button>claim</Button>
                    </TableCell>
                    <TableCell>+15</TableCell>

                    <TableCell className="text-right">yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="finished">
              <Table>
                <TableCaption> A list of your finished policy.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Block</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Claim status</TableHead>
                    <TableHead className="text-center">-</TableHead>
                    <TableHead>Points</TableHead>

                    <TableHead className="text-right">High Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell className="w-[100px]">001-002</TableCell>
                    <TableCell>100</TableCell>
                    <TableCell>$10,000</TableCell>
                    <TableCell>yes</TableCell>
                    <TableCell className="text-center">
                      <Button>claim</Button>
                    </TableCell>
                    <TableCell>+15</TableCell>

                    <TableCell className="text-right">yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </>
  )
}

export default GasInsureList
