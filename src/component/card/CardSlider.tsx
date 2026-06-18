import { Children } from 'react'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import {
    CardSliderDefaultProps,
    CardSliderWrapperProps,
    DefaultSwiperConfig,
    OtherSwiperConfig,
} from './type/card.type'

const defaultSwiperConfig: DefaultSwiperConfig = {
    spaceBetween: 20,
    autoHeight: true,
    speed: 1000,
}

const otherSwiperConfig: OtherSwiperConfig = {
    breakpoints: {},
    modules: [Pagination, Navigation],
}

export const CardSliderDefault = ({
    className = '',
    children = null,
}: CardSliderDefaultProps) => (
    <div className={joinClassNameHelper('card card-body', className)}>
        {children}
    </div>
)

export const CardSliderWrapper = ({
    className = '',
    classNameSlide = '',
    classNameCardDefault = '',
    isUseDefaultCard = true,
    customRenderNavigation = null,
    children = null,
    defaultConfig = {},
    config = {},
    otherConfig = {},
}: CardSliderWrapperProps) => {
    const mergedDefaultConfig: DefaultSwiperConfig = {
        ...defaultSwiperConfig,
        ...defaultConfig,
    }

    const mergedOtherConfig: OtherSwiperConfig = {
        breakpoints: {
            ...otherSwiperConfig.breakpoints,
            ...otherConfig?.breakpoints,
        },
        modules: [
            ...(otherSwiperConfig.modules || []),
            ...(otherConfig?.modules || []),
        ],
    }

    return (
        <Swiper
            {...mergedDefaultConfig}
            {...config}
            breakpoints={mergedOtherConfig.breakpoints}
            modules={mergedOtherConfig.modules}
            className={joinClassNameHelper('custom-swiper-wrapper', className)}>
            {Children.map(children, (child, index) => (
                <SwiperSlide key={index} className={classNameSlide}>
                    {isUseDefaultCard ? (
                        <CardSliderDefault className={classNameCardDefault}>
                            {child}
                        </CardSliderDefault>
                    ) : (
                        child
                    )}
                </SwiperSlide>
            ))}

            {customRenderNavigation}
        </Swiper>
    )
}
