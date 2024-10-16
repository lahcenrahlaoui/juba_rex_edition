import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/449132943_1143510953372775_2552607230458177098_n-removebg-preview.png'


type PropTypes = {
    mobile?: boolean
}

const Logo = ({ mobile = false }: PropTypes) => {
    return (
        <Link href='/'>
            <Image src={logo} alt='' className={`${mobile ? 'w-[60px]' : 'w-[70px]'} `} />
        </Link>
    )
}

export default Logo