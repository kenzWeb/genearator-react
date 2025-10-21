export const entropyTypeBadgeClass = (
	type: 'physical' | 'algorithmic' | 'hybrid',
	styles: Record<string, string>,
) => {
	switch (type) {
		case 'physical':
			return `${styles.badge} ${styles.physical}`
		case 'hybrid':
			return `${styles.badge} ${styles.hybrid}`
		case 'algorithmic':
		default:
			return `${styles.badge} ${styles.algorithmic}`
	}
}
