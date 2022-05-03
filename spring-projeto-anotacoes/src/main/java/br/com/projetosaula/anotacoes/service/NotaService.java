package br.com.projetosaula.anotacoes.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetosaula.anotacoes.data.dto.NotaDTO;
import br.com.projetosaula.anotacoes.data.entity.Nota;
import br.com.projetosaula.anotacoes.repository.NotaRepository;

@Service // vai injetar esta classe no controller
public class NotaService 
{
	@Autowired // anotação para injetar classe/interface
	NotaRepository repository;
	
	public List<NotaDTO> getAll()
	{
		List<Nota> notas = repository.findAll();
		
		List<NotaDTO> listaNotasDTO = new ArrayList();
		
		// populando a listaNotasDTO com notas 
		for (Nota nota : notas) 
		{
			listaNotasDTO.add(nota.getDTO());
		}
		return listaNotasDTO;
	}
	
	public NotaDTO getById(Integer id) throws Exception
	{
		Nota nota = repository.findById(id).orElseThrow(()-> new Exception("Nota não encontrada."));
		
		return nota.getDTO();
	}

	public NotaDTO add(NotaDTO nota)
	{
		return repository.save(nota.convertToEntity()).getDTO();
	}

	public Boolean delete(Integer id) throws Exception
	{
		repository.delete(getById(id).convertToEntity());
		return true;
	}

	public NotaDTO update(NotaDTO nota) throws Exception
	{
		// salva a entidade e coonverte pra dto dnv
//		return repository.save(nota.convertToEntity()).getDTO();
//		OU
		// se n encontrar a nota ja lança uma exceção
		getById(nota.getIdNota());
		return add(nota);
	}
}
