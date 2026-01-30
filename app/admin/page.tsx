import { ChartAreaInteractive } from '@/components/sidebar/chart-area-interactive'
import { SectionCards } from '@/components/sidebar/section-cards'
import { adminGetEnrollmentStats } from '../data/admin/admin-get-enrollment-stats';

const 
AdminIndexPage = async () => {
  const enrollmentData = await adminGetEnrollmentStats();
  return (
    <>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div>
          <ChartAreaInteractive data={enrollmentData}/>
        </div>
      </div>
    </>
  )
}

export default AdminIndexPage