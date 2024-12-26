
export const Icons = {
  spinner: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2 L12 6" />
    </svg>
  )
}