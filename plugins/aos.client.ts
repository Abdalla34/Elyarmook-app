// plugins/aos.client.ts
import AOS from 'aos'
import 'aos/dist/aos.css' // لو ما حطيتش في nuxt.config.ts

export default defineNuxtPlugin(() => {
  if (process.client) {
    AOS.init({
      // اختيارات شائعة
      duration: 800,   // مدة الأنيميشن بالـ ms
      once: true,      // يرندر الأنيميشن مرة وحدة بس عند الظهور
      mirror: false    // لو عايز الأنيميشن يشتغل لما تمر على العنصر من تحت
    })

    // لو عايز تعيد تهيئة AOS عند التنقل بين الصفحات
    try {
      const router = useRouter()
      router.afterEach(() => {
        // small delay ensures DOM render قبل الـ refresh
        setTimeout(() => AOS.refresh(), 50)
      })
    } catch (e) {
      // fallback هادي لو ما قدرناش نستخدم ال router
      // console.warn('AOS router refresh failed', e)
    }
  }
})
