export interface IMovie {
    moviedb_id: number
    overview: string
    poster_path: string
    date: Date
    title: string
    on_my_library: boolean
    release_date: Date
    added_date?: Date
};

export interface IMovieDetails {
    backdrop_path: string
    budget: number
    budget_format: string
    genres: Array<{
        id: number
        name: string
    }>
    homepage: string
    moviedb_id: number
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    release_date: Date
    revenue: number
    revenue_format: string
    status: string
    title: string
    vote_average: number
    vote_count: number
    on_my_library: boolean
    user_raiting?: number
}
