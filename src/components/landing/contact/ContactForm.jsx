import { useState } from 'react'
import contactFormImage from '../../../assets/images/abc.png'
import toast from '../../../utils/toast'

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const fields = [
  { id: 'name', label: 'Your Name *', type: 'text', required: true },
  { id: 'email', label: 'Your Email *', type: 'email', required: true },
  { id: 'phone', label: 'Your Phone *', type: 'tel', required: true },
  { id: 'subject', label: 'Subject', type: 'text', required: false },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FloatingInput = ({ error, label, ...props }) => (
  <div className='min-w-0'>
    <div className='group relative h-[62px]'>
      <input
        placeholder=' '
        aria-invalid={Boolean(error)}
        className={`peer h-full w-full border-0 border-b bg-transparent px-0 pb-2 pt-7 text-sm font-semibold text-white outline-none transition placeholder:text-transparent focus:border-primary ${
          error ? 'border-primary' : 'border-white/35'
        }`}
        {...props}
      />
      <label
        htmlFor={props.id}
        className={`pointer-events-none absolute left-0 text-[11px] font-black transition-all duration-200 peer-placeholder-shown:top-7 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-primary ${
          props.value ? 'top-1 text-[10px] text-white/65' : 'top-7 text-white'
        } ${error ? 'text-primary peer-placeholder-shown:text-primary' : ''}`}
      >
        {label}
      </label>
    </div>
    {error && <p className='mt-2 text-[10px] font-semibold text-primary'>{error}</p>}
  </div>
)

const FloatingTextarea = ({ error, label, ...props }) => (
  <div className='sm:col-span-2'>
    <div className='group relative h-[126px]'>
      <textarea
        placeholder=' '
        aria-invalid={Boolean(error)}
        className={`peer h-full w-full resize-none border-0 border-b bg-transparent px-0 pb-3 pt-8 text-sm font-semibold text-white outline-none transition placeholder:text-transparent focus:border-primary ${
          error ? 'border-primary' : 'border-white/35'
        }`}
        {...props}
      />
      <label
        htmlFor={props.id}
        className={`pointer-events-none absolute left-0 text-[11px] font-black transition-all duration-200 peer-placeholder-shown:top-8 peer-placeholder-shown:text-[11px] peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-[10px] peer-focus:text-primary ${
          props.value ? 'top-1 text-[10px] text-white/65' : 'top-8 text-white'
        } ${error ? 'text-primary peer-placeholder-shown:text-primary' : ''}`}
      >
        {label}
      </label>
    </div>
    {error && <p className='mt-2 text-[10px] font-semibold text-primary'>{error}</p>}
  </div>
)

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.name.trim()) nextErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!emailPattern.test(formData.email)) {
      nextErrors.email = 'Enter a valid email'
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Phone is required'
    if (!formData.message.trim()) nextErrors.message = 'Message is required'

    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    const firstError = Object.values(nextErrors).find(Boolean)

    if (firstError) {
      toast.error(firstError)
      return
    }

    toast.success('Message sent successfully')
    setFormData(initialFormData)
  }

  return (
    <section className='bg-page px-4 pb-10 pt-2 text-white lg:px-6'>
      <div className='mx-auto max-w-[1180px] overflow-hidden rounded-[14px] bg-[#111111] shadow-[0_20px_55px_rgba(0,0,0,0.32)] ring-1 ring-white/6'>
        <div className='grid lg:grid-cols-[0.92fr_1.08fr]'>
          <div className='min-h-[320px] overflow-hidden lg:min-h-[620px]'>
            <img
              src={contactFormImage}
              alt='Paintball player aiming marker'
              className='h-full w-full object-cover object-center'
              loading='lazy'
              decoding='async'
            />
          </div>

          <div className='px-6 py-9 sm:px-9 lg:px-10 lg:py-14'>
            <h2 className='text-[clamp(2rem,4vw,3rem)] font-medium leading-tight text-white'>
              Send Us a Message
            </h2>
            <p className='mt-4 max-w-[560px] text-base font-semibold leading-6 text-white/90 sm:text-lg'>
              Please complete the form below, and our team will respond to your inquiry promptly.
            </p>

            <form onSubmit={handleSubmit} className='mt-12 grid gap-x-7 gap-y-8 sm:grid-cols-2'>
              {fields.map((field) => (
                <FloatingInput
                  key={field.id}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  label={field.label}
                  value={formData[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                />
              ))}

              <FloatingTextarea
                id='message'
                name='message'
                label='Message'
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
              />

              <div className='sm:col-span-2'>
                <button
                  type='submit'
                  className='brand-red-gradient h-12 min-w-[138px] rounded-full px-8 text-[11px] font-black uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(230,1,3,0.26)] transition hover:brightness-110 active:translate-y-0.5'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
