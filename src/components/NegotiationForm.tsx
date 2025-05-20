'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { negotiationFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function NegotiationForm({ onSubmit }: { onSubmit: (data: z.infer<typeof negotiationFormSchema>) => void }) {
  const form = useForm<z.infer<typeof negotiationFormSchema>>({
    resolver: zodResolver(negotiationFormSchema),
    defaultValues: {
      domain: '',
      experience: '', 
      education: '',
      expectations: '',
      offerText: ''
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Domain</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineering, Marketing, etc." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience (e.g., "3-5")</FormLabel>
              <FormControl>
                <Input 
                  placeholder="3-5" 
                  {...field} 
                  onChange={e => field.onChange(e.target.value)} // Keep as string
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <Input placeholder="Bachelor's in Computer Science" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Expectations</FormLabel>
              <FormControl>
                <Textarea placeholder="Looking for 20% salary increase..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="offerText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Offer Text</FormLabel>
              <FormControl>
                <Textarea rows={8} placeholder="Paste job offer here..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Generate Counter-Offer</Button>
      </form>
    </Form>
  )
}
