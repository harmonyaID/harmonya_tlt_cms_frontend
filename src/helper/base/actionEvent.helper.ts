export const eventChange = (event: any, isBooleanChecked: boolean = false) => {
   const target = event.target
   let isChecked: number | boolean | null = null

   const value = target?.type === 'number' ? Number(target.value) : target.value
   const name = target.name

   if (target?.type === 'checkbox') {
      isChecked = isBooleanChecked ? target.checked : target.checked ? 1 : 0
   }

   return { name, value, isChecked }
}
