//
//  NetworkManager.swift
//  iSchoolCheckInKiosk
//
//  Created by Lowell Pence on 9/19/21.
//

import Foundation

final class NetworkManager {
	
	let url: URL
	
	
	init(url: URL) {
		self.url = url
	}
	
	
	func fetchAvailableAdivsors() async throws -> [Advisor] {
		
		guard let url = URL(string: "test") else {
			return []
		}
		
		let (data, _) = try await URLSession.shared.data(from: url)
		
		let advisors = try JSONDecoder().decode([Advisor].self, from: data)
		
		return advisors
	}
	
	/**
	 static func fetchAlbumWithAsyncURLSession() async throws -> [Album] {

		 guard let url = URL(string: "https://itunes.apple.com/search?term=taylor+swift&entity=album") else {
			 throw AlbumsFetcherError.invalidURL
		 }

		 // Use the async variant of URLSession to fetch data
		 // Code might suspend here
		 let (data, _) = try await URLSession.shared.data(from: url)

		 // Parse the JSON data
		 let iTunesResult = try JSONDecoder().decode(ITunesResult.self, from: data)
		 return iTunesResult.results
	 }
	 */
	
}
