import { HeartIcon } from '@heroIcons/react/outline'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

//maximo de digitos 
const MAX_TWEET_CHAR = 250


function TweetForm({loggedinUser, onSuccess}){
  const formik = useFormik({
    onSubmit: async (values, form) => {
     await axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_HOST}/tweets`,
      headers:{
        'authorization': `Beare ${loggedinUser.accessToken}`
      },
      data:{
        text: values.text
      },
    })
    //limpar tt
    form.setFieldValue('text', '')
    onSuccess()
  },
    initialValues:{
      text: ''
    }
  })

  function changeText(e){
    setText(e.target.value)
  }


  return(

  <div className='border-b border-silver p-4 space-y-6'>

      <div className='flex space-x-5'>
        <img src= '/src/Mask group.png' className='w-7'/>
        <h1 className='font-bold text-xl'>Página inicial </h1>
      </div>

      <form className='pl-12 text-lg flex flex-col ' onSubmit={formik.handleSubmit}>
        <textarea
        name='text'
        value={formik.values.text}
        placeholder='O que está acontecendo?'
        className='bg-transparent outline-none disabled:opacity-50'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={formik.isSubmitting}
        />        

        <div className='flex justify-end items-center space-x-3'>
        <span className='text-sm'>
          <span>{formik.values.text.length}/</span><span className='text-birdblue'>{MAX_TWEET_CHAR}</span>
        </span>
        <button 
        type='submit'
         className='bg-birdblue px-5 py-2 rounded-full disabled:opacity-50'
         disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting}
         >Tweet
         </button>
        </div>
      </form>

    </div>

  
  )
}
function Tweet({name, username, avatar, children}){
  

  return(
    <div className="flex space-x-3 p-4 border-b border-solid border-silver">
    <div> 
      <img src={avatar}/>
      </div>
      <div className='space-y-1'>
        <span className="hover:text-birdblue font-bold text-sm">
          {name}
        </span>{' '}

        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p> 

        <div className='flex space-x-1 text-silver text-sm items-center'>
        <HeartIcon className='w-4 stroke-1 stroke-silver'/>
        <span>1.5k</span>
        </div>
      </div>
  </div>
  )
}

export function Home({loggedinUser}) {
  const [data, setData] = useState([])

  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        authorization: `Bearer ${loggedinUser.accessToken}`
      }
    })
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [])
  
  return(/*retorna os tt*/
  <>
  <TweetForm loggedinUser={loggedinUser} onSuccess={getData} />
  <div>
    {data.length && data.map(tweet => (
       <Tweet Key={tweet.id} name={tweet.user.name} username={tweet.user.username}  avatar="/src/Mask group.png">
       {tweet.text}
       </Tweet>
    ))}
  </div>
  </>
    
  )
}

