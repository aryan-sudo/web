import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IconTool, IconClock, IconAlertCircle } from "@tabler/icons-react";

export default function UnderConstruction() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <IconTool className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Under Construction</CardTitle>
          <CardDescription>
            We&apos;re working hard to bring you something amazing
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <IconAlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Heading as="h3" className="text-base font-medium">
                    What&apos;s happening?
                  </Heading>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;re currently building this section of our application. Check back soon for new features and improvements.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="timeline" className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <IconClock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <Heading as="h3" className="text-base font-medium">
                    Expected completion
                  </Heading>
                  <p className="text-sm text-muted-foreground mt-1">
                    We&apos;re aiming to launch this feature within the next few weeks. Thank you for your patience!
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
          <Button>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 