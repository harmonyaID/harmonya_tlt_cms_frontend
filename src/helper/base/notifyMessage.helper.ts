interface OptionsType {
   style?: string
   message?: any
   position?: string
   type?: string
   showClose?: boolean
   timeout?: number
   onShown?: () => void
   onClosed?: () => void
   thumbnail?: any
   title?: string
}

function createNotification(
   passContainer: HTMLElement | any,
   passOptions: Partial<OptionsType>,
): void {
   const container = document.body
   const notification = document.createElement('div')
   notification.className = 'pgn push-on-sidebar-open'
   const options: OptionsType = Object.assign(
      {
         style: 'simple',
         message: null,
         position: 'top-right',
         type: 'info',
         showClose: true,
         timeout: 4000,
         onShown: () => {},
         onClosed: () => {},
      },
      passOptions,
   )

   let wrapper: HTMLElement

   if (
      !container.querySelector(
         `.pgn-wrapper[data-position="${options.position}"]`,
      )
   ) {
      wrapper = document.createElement('div')
      wrapper.className = 'pgn-wrapper'
      wrapper.setAttribute('data-position', options.position!)
      container.appendChild(wrapper)
   } else {
      wrapper = container.querySelector(
         `.pgn-wrapper[data-position="${options.position}"]`,
      )!
   }

   const alert = document.createElement('div')
   alert.className = 'alert'
   alert.classList.add('alert-' + options.type)

   if (options.style === 'bar') {
      BarNotification()
   } else if (options.style === 'flip') {
      FlipNotification()
   } else if (options.style === 'circle') {
      CircleNotification()
   } else {
      SimpleNotification() // default = 'simple'
   }

   function SimpleNotification() {
      notification.classList.add('pgn-simple')
      alert.innerHTML = options.message
      if (options.showClose) {
         const close = document.createElement('button')
         close.type = 'button'
         close.className = 'btn-close'
         close.setAttribute('data-bs-dismiss', 'alert')
         alert.insertBefore(close, alert.firstChild)
      }
   }

   function BarNotification() {
      notification.classList.add('pgn-bar')
      alert.classList.add('alert-' + options.type)

      const container = document.createElement('div')
      container.className = 'container'
      container.innerHTML = '<span>' + options.message + '</span>'

      if (options.showClose) {
         const close = document.createElement('button')
         close.type = 'button'
         close.className = 'btn-close'
         close.setAttribute('data-bs-dismiss', 'alert')
         container.appendChild(close)
      }
      alert.appendChild(container)
   }

   function CircleNotification() {
      notification.classList.add('pgn-circle')

      let table = '<div>'
      if (options.thumbnail) {
         table += `<div class="pgn-thumbnail"><div>${options.thumbnail}</div></div>`
      }

      table += '<div class="pgn-message"><div>'

      if (options.title) {
         table += `<p class="bold">${options.title}</p>`
      }
      table += `<p>${options.message}</p></div></div>`
      table += '</div>'

      if (options.showClose) {
         table += `<button type="button" class="close" data-bs-dismiss="alert">
                  <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>`
      }

      alert.innerHTML = table
      alert.insertAdjacentHTML('afterend', '<div class="clearfix"></div>')
   }

   function FlipNotification() {
      notification.classList.add('pgn-flip')
      alert.innerHTML = '<span>' + options.message + '</span>'
      if (options.showClose) {
         const close = document.createElement('button')
         close.type = 'button'
         close.className = 'btn-close'
         close.setAttribute('data-bs-dismiss', 'alert')
         alert.insertBefore(close, alert.firstChild)
      }
   }

   notification.appendChild(alert)

   const placeContainer = document.getElementById('container-pgn-wrapper')!
   placeContainer.appendChild(notification)

   function alignWrapperToContainer() {
      const containerPosition = container.getBoundingClientRect()
      const containerHeight = containerPosition.height
      const containerWidth = containerPosition.width

      const containerTop = containerPosition.top
      const containerBottom =
         container.parentElement!.clientHeight -
         (containerTop + containerHeight)
      const containerLeft = containerPosition.left
      const containerRight =
         container.parentElement!.clientWidth - (containerLeft + containerWidth)

      if (/top/.test(options.position!)) {
         wrapper.style.top = containerTop + 'px'
      }
      if (/bottom/.test(options.position!)) {
         wrapper.style.bottom = containerBottom + 'px'
      }
      if (/left/.test(options.position!)) {
         wrapper.style.left = containerLeft + 'px'
      }
      if (/right/.test(options.position!)) {
         wrapper.style.right = containerRight + 'px'
      }
   }

   if (document.body.classList.contains('horizontal-menu')) {
      alignWrapperToContainer()
      window.addEventListener('resize', alignWrapperToContainer)
   }

   alert.addEventListener('closed.bs.alert', function () {
      notification.remove()
      options.onClosed!()
   })

   if (options.timeout !== 0) {
      setTimeout(() => {
         notification.remove()
      }, options.timeout)
   }
}

const notifyMessageHelper = createNotification
export default notifyMessageHelper
