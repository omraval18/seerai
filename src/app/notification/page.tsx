import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

export default function NotificationPage() {
  return (
      <main className='w-full h-screen flex justify-center items-center'>
          <Card className="border-none">
              <CardHeader>
                  <CardTitle>Please Check Your Email Account!</CardTitle>
                  <CardDescription>We've sent you a Link to Confirm Your Account.</CardDescription>
              </CardHeader>

              
          </Card>
      </main>
  );
}
